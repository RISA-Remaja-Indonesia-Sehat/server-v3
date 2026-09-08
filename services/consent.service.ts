import { prisma } from "../config/prisma";

import { CONSENT_REQUEST_TTL_MINUTES, CURRENT_PARENT_CONSENT_VERSION } from "../config/consent";

export async function createApprovedConsentRequest(
  guardianId: string
) {
  await prisma.guardian.upsert({
    where: {
      id: guardianId,
    },
    update: {},
    create: {
      id: guardianId,
    },
  });

  const now = new Date();

  const expiresAt = new Date(
    now.getTime() +
      CONSENT_REQUEST_TTL_MINUTES *
        60 *
        1000
  );

  return prisma.consentRequest.create({
    data: {
      guardianId,

      policyVersion:
        CURRENT_PARENT_CONSENT_VERSION,

      status: "APPROVED",
      approvedAt: now,
      expiresAt,
    },
  });
}