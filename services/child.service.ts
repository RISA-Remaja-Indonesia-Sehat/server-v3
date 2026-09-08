import bcrypt from "bcryptjs";

import { prisma } from "../config/prisma";

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

  return prisma.$transaction(async (tx) => {
    /*
     * Consent harus:
     * - milik Guardian ini
     * - APPROVED
     * - belum expired
     */
    const consentRequest = await tx.consentRequest.findFirst({
      where: {
        id: consentRequestId,

        guardianId,

        status: "APPROVED",

        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!consentRequest) {
      throw new Error("CONSENT_NOT_VALID");
    }

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

    include: {
      chapters: true,
      postTest: true,
    },
  });

  if (!child) {
    return null;
  }

  const completedChapters = child.chapters
    .filter((chapter) => chapter.completedAt !== null)
    .map((chapter) => chapter.chapterNumber)
    .sort((a, b) => a - b);

  return {
    child: {
      id: child.id,
      username: child.username,
      avatarId: child.avatarId,
    },

    completedChapters,

    postTestCompleted: Boolean(child.postTest?.completedAt),
  };
}
