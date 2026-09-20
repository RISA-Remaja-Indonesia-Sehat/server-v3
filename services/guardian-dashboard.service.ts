import { prisma } from "../config/prisma.js";

const TOTAL_CHAPTERS = 7;

export async function getGuardianDashboardData(
  guardianId: string,
) {
  const relations =
    await prisma.guardianChild.findMany({
      where: {
        guardianId,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        status: true,
        createdAt: true,

        child: {
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

            consents: {
              where: {
                guardianId,
              },

              orderBy: {
                consentedAt: "desc",
              },

              take: 1,

              select: {
                policyVersion: true,
                consentedAt: true,
                revokedAt: true,
              },
            },
          },
        },
      },
    });

  return relations.map((relation) => {
    const completedChapters =
      relation.child.chapters
        .map((chapter) => chapter.chapterNumber)
        .sort((a, b) => a - b);

    return {
      id: relation.child.id,
      username: relation.child.username,
      avatarId: relation.child.avatarId,
      accessStatus: relation.status,
      linkedAt: relation.createdAt,
      completedChapters,
      completedChapterCount:
        completedChapters.length,
      totalChapters: TOTAL_CHAPTERS,
      postTestCompleted:
        relation.child.postTest?.completedAt != null,
      consent:
        relation.child.consents[0] ?? null,
    };
  });
}
