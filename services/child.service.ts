import bcrypt from "bcryptjs";

import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";

import { assertConsentRequestUsable } from "./consent.service.js";

const CHAPTER_1_TOTAL_SCORE = 6;
const CHAPTER_1_MINIMUM_SCORE = 4;

type SetupChildParams = {
  guardianId: string;
  consentRequestId: string;

  username: string;
  pin: string;
  avatarId: string;

  guestChapter1Completed: boolean;
};

export async function setupChildProfile({
  guardianId,
  consentRequestId,
  username,
  pin,
  avatarId,
  guestChapter1Completed,
}: SetupChildParams) {
  const cleanUsername = username.trim().toLowerCase();

  if (!/^[a-zA-Z0-9_]{3,24}$/.test(cleanUsername)) {
    throw new Error("INVALID_USERNAME");
  }

  if (!/^\d{6}$/.test(pin)) {
    throw new Error("INVALID_PIN");
  }

  if (!/^avatar-\d{2}$/.test(avatarId)) {
    throw new Error("INVALID_AVATAR");
  }

  const existingUsername = await prisma.childProfile.findUnique({
    where: {
      username: cleanUsername,
    },
  });

  if (existingUsername) {
    throw new Error("USERNAME_TAKEN");
  }

  const pinHash = await bcrypt.hash(pin, 12);

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    /*
     * Consent harus:
     * - milik Guardian ini
     * - APPROVED
     * - belum expired
     */
    const consentRequest = await tx.consentRequest.findUnique({
      where: {
        id: consentRequestId,
      },

      select: {
        id: true,
        guardianId: true,
        policyVersion: true,
        status: true,
        approvedAt: true,
        expiresAt: true,
      },
    });

    assertConsentRequestUsable(consentRequest, guardianId);

    const child = await tx.childProfile.create({
      data: {
        username: cleanUsername,

        avatarId,

        pinHash,
      },
    });

    /*
     * Hubungkan Guardian dengan anak.
     *
     * Inilah yang memungkinkan:
     * satu Guardian → banyak anak.
     */
    await tx.guardianChild.create({
      data: {
        guardianId,
        childId: child.id,
      },
    });

    /*
     * Buat catatan consent final
     * setelah ChildProfile mempunyai ID.
     */
    await tx.parentalConsent.create({
      data: {
        guardianId,
        childId: child.id,

        policyVersion: consentRequest.policyVersion,

        consentedAt: consentRequest.approvedAt ?? new Date(),
      },
    });

    /*
     * Sinkronkan Chapter 1 milik guest.
     */
    if (guestChapter1Completed) {
      await tx.chapterProgress.create({
        data: {
          childId: child.id,
          chapterNumber: 1,
          completedAt: new Date(),
        },
      });
    }

    /*
     * ConsentRequest sudah dipakai.
     */
    await tx.consentRequest.update({
      where: {
        id: consentRequest.id,
      },

      data: {
        status: "CONSUMED",
        consumedAt: new Date(),
      },
    });

    return child;
  });
}

export async function authenticateChild(username: string, pin: string) {
  const cleanUsername = username.trim().toLowerCase();

  const child = await prisma.childProfile.findUnique({
    where: {
      username: cleanUsername,
    },
  });

  if (!child || !child.pinHash) {
    return null;
  }

  const validPin = await bcrypt.compare(pin, child.pinHash);

  if (!validPin) {
    return null;
  }

  return {
    id: child.id,
    username: child.username,
    avatarId: child.avatarId,
  };
}

export async function getChildHomeData(childId: string) {
  const child = await prisma.childProfile.findUnique({
    where: {
      id: childId,
    },

    select: {
      id: true,
      username: true,
      avatarId: true,

      chapters: {
        where: {
          completedAt: {
            not: null,
          },
        },
        select: {
          chapterNumber: true,
        },
      },

      postTest: {
        select: {
          completedAt: true,
        },
      },
    },
  });

  if (!child) {
    return null;
  }

  const completedChapters = child.chapters
    .map((chapter: { chapterNumber: number }) => chapter.chapterNumber)
    .sort((a: number, b: number) => a - b);

  return {
    child: {
      id: child.id,
      username: child.username,
      avatarId: child.avatarId,
    },

    completedChapters,

    postTestCompleted:
      child.postTest?.completedAt !== null && child.postTest !== null,
  };
}

type CompleteChapterParams = {
  childId: string;
  chapterNumber: number;
  score?: number;
};

export async function completeChapterProgress({
  childId,
  chapterNumber,
  score,
}: CompleteChapterParams) {
  if (
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > 7
  ) {
    throw new Error("INVALID_CHAPTER_NUMBER");
  }

  if (chapterNumber === 1) {
    const isValidScore =
      score !== undefined &&
      Number.isInteger(score) &&
      score >= 0 &&
      score <= CHAPTER_1_TOTAL_SCORE;

    if (!isValidScore) {
      throw new Error("INVALID_CHAPTER_SCORE");
    }

    if (score < CHAPTER_1_MINIMUM_SCORE) {
      throw new Error("CHAPTER_NOT_PASSED");
    }
  }

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    /*
     * Chapter 2-7 hanya boleh diselesaikan
     * kalau chapter sebelumnya sudah selesai.
     */
    if (chapterNumber > 1) {
      const previousChapter = await tx.chapterProgress.findUnique({
        where: {
          childId_chapterNumber: {
            childId,
            chapterNumber: chapterNumber - 1,
          },
        },

        select: {
          completedAt: true,
        },
      });

      if (!previousChapter?.completedAt) {
        throw new Error("PREVIOUS_CHAPTER_NOT_COMPLETED");
      }
    }

    const existing = await tx.chapterProgress.findUnique({
      where: {
        childId_chapterNumber: {
          childId,
          chapterNumber,
        },
      },
    });

    const completedAt = existing?.completedAt ?? new Date();

    return tx.chapterProgress.upsert({
      where: {
        childId_chapterNumber: {
          childId,
          chapterNumber,
        },
      },

      create: {
        childId,
        chapterNumber,
        completedAt,

        ...(score !== undefined ? { score } : {}),
      },

      update: {
        completedAt,

        ...(score !== undefined ? { score } : {}),
      },

      select: {
        chapterNumber: true,
        score: true,
        completedAt: true,
      },
    });
  });
}
