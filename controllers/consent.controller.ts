import type { Request, Response } from "express";
import { createApprovedConsentRequest, validateConsentRequestForSetup } from "../services/consent.service.js";

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

export async function validateConsentRequest(
  req: Request,
  res: Response,
) {
  try {
    const guardianId =
      res.locals.guardianId as string;

    const consentRequestId =
      req.params.consentRequestId as string;

    if (!consentRequestId) {
      return res.status(400).json({
        success: false,
        message:
          "ID persetujuan tidak ditemukan.",
      });
    }

    const consentRequest =
      await validateConsentRequestForSetup(
        consentRequestId,
        guardianId,
      );

    return res.status(200).json({
      success: true,

      data: {
        consentRequest: {
          id: consentRequest.id,
          status: consentRequest.status,
          expiresAt:
            consentRequest.expiresAt,
        },
      },
    });
  } catch (error) {
    const code =
      error instanceof Error
        ? error.message
        : "";

    if (code === "CONSENT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message:
          "Persetujuan tidak ditemukan.",
      });
    }

    if (
      code ===
      "CONSENT_GUARDIAN_MISMATCH"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Persetujuan ini tidak tersedia untuk akun wali yang sedang masuk.",
      });
    }

    if (code === "CONSENT_ALREADY_USED") {
      return res.status(409).json({
        success: false,
        message:
          "Persetujuan ini sudah pernah digunakan.",
      });
    }

    if (code === "CONSENT_EXPIRED") {
      return res.status(410).json({
        success: false,
        message:
          "Persetujuan sudah kedaluwarsa. Silakan buat persetujuan baru.",
      });
    }

    if (code === "CONSENT_NOT_APPROVED") {
      return res.status(403).json({
        success: false,
        message:
          "Persetujuan orang tua atau wali belum disetujui.",
      });
    }

    console.error(
      "Validate consent error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal memeriksa persetujuan.",
    });
  }
}