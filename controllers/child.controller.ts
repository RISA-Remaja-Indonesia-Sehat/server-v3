import type { Request, Response } from "express";

import { setupChildProfile } from "../services/child.service";

export async function setupChild(req: Request, res: Response) {
  try {
    const guardianId = res.locals.guardianId as string;

    const {
      consentRequestId,
      username,
      pin,
      avatarId,
      guestChapter1Completed,
    } = req.body;

    if (
      typeof consentRequestId !== "string" ||
      typeof username !== "string" ||
      typeof pin !== "string" ||
      typeof avatarId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Data profil anak tidak lengkap.",
      });
    }

    const child = await setupChildProfile({
      guardianId,
      consentRequestId,
      username,
      pin,
      avatarId,

      guestChapter1Completed: guestChapter1Completed === true,
    });

    return res.status(201).json({
      success: true,

      data: {
        child: {
          id: child.id,
          username: child.username,
          avatarId: child.avatarId,
        },
      },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";

    if (code === "USERNAME_TAKEN") {
      return res.status(409).json({
        success: false,
        message: "Username sudah digunakan. Coba username lain.",
      });
    }

    if (code === "INVALID_USERNAME") {
      return res.status(400).json({
        success: false,
        message:
          "Username harus terdiri dari 3–24 karakter dan hanya boleh menggunakan huruf, angka, atau underscore.",
      });
    }

    if (code === "INVALID_PIN") {
      return res.status(400).json({
        success: false,
        message: "PIN harus terdiri dari 6 angka.",
      });
    }

    if (code === "CONSENT_NOT_VALID") {
      return res.status(403).json({
        success: false,
        message: "Persetujuan tidak valid atau sudah kedaluwarsa.",
      });
    }

    if (code === "CONSENT_NOT_FOUND") {
  return res.status(404).json({
    success: false,
    message:
      "Permintaan persetujuan tidak ditemukan.",
  });
}

if (
  code ===
  "CONSENT_GUARDIAN_MISMATCH"
) {
  return res.status(403).json({
    success: false,
    message:
      "Persetujuan bukan milik akun orang tua yang sedang masuk.",
  });
}

if (
  code ===
  "CONSENT_NOT_APPROVED"
) {
  return res.status(403).json({
    success: false,
    message:
      "Persetujuan orang tua belum disetujui.",
  });
}

if (code === "CONSENT_EXPIRED") {
  return res.status(410).json({
    success: false,
    message:
      "Persetujuan sudah kedaluwarsa.",
  });
}

    console.error("Setup child error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal membuat profil anak.",
    });
  }
}
