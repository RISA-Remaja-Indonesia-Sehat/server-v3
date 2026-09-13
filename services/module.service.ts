import { prisma } from "../config/prisma.js"

export async function getLearningModuleByChapter(
  chapterNumber: number
) {
  return prisma.learningModule.findUnique({
    where: {
      chapterNumber,
    },

    select: {
      id: true,
      chapterNumber: true,
      title: true,
      objective: true,
      durationLabel: true,
      contentVersion: true,
      lastReviewedAt: true,

      cards: {
        orderBy: {
          order: "asc",
        },

        select: {
          id: true,
          order: true,
          title: true,
          content: true,
        },
      },
    },
  });
}