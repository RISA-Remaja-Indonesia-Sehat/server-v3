import { prisma } from "../config/prisma";

export async function getOrCreateGuardian(
  guardianId: string,
) {
  const guardian = await prisma.guardian.upsert({
    where: {
      id: guardianId,
    },

    update: {},

    create: {
      id: guardianId,
    },
  });

  return guardian;
}