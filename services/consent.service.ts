import { prisma } from "../config/prisma.js";

import { CONSENT_REQUEST_TTL_MINUTES, CURRENT_PARENT_CONSENT_VERSION } from "../config/consent.js";

type ConsentRequestForSetup = {
  guardianId: string;

  status:
    | "PENDING"
    | "APPROVED"
    | "CONSUMED"
    | "REJECTED"
    | "EXPIRED";

  expiresAt: Date;
};

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

export function assertConsentRequestUsable(
  consentRequest: ConsentRequestForSetup | null,
  guardianId: string,
  now = new Date(),
): asserts consentRequest is ConsentRequestForSetup {
  if (!consentRequest) {
    throw new Error("CONSENT_NOT_FOUND");
  }

  if (consentRequest.guardianId !== guardianId) {
    throw new Error("CONSENT_GUARDIAN_MISMATCH");
  }

  if (consentRequest.status === "CONSUMED") {
    throw new Error("CONSENT_ALREADY_USED");
  }

  if (
    consentRequest.status === "EXPIRED" ||
    consentRequest.expiresAt <= now
  ) {
    throw new Error("CONSENT_EXPIRED");
  }

  if (consentRequest.status !== "APPROVED") {
    throw new Error("CONSENT_NOT_APPROVED");
  }
}

export async function validateConsentRequestForSetup(
  consentRequestId: string,
  guardianId: string,
) {
  const consentRequest =
    await prisma.consentRequest.findUnique({
      where: {
        id: consentRequestId,
      },

      select: {
        id: true,
        guardianId: true,
        status: true,
        expiresAt: true,
      },
    });

  assertConsentRequestUsable(
    consentRequest,
    guardianId,
  );

  return {
    id: consentRequest.id,
    status: consentRequest.status,
    expiresAt: consentRequest.expiresAt,
  };
}