import type { Request, Response } from "express";
import { createApprovedConsentRequest } from "../services/consent.service";

export async function approveConsent(req: Request, res: Response) {
  try {
    const guardianId = res.locals.guardianId as string;

    const consentRequest = await createApprovedConsentRequest(guardianId);

    return res.status(201).json({
      success: true,

      data: {
        consentRequest: {
          id: consentRequest.id,
          status: consentRequest.status,
          expiresAt: consentRequest.expiresAt,
        },
      },
    });
  } catch (error) {
    console.error("Approve consent error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan persetujuan.",
    });
  }
}
