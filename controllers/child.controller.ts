import type { Request, Response } from "express";

import {
  authenticateChild,
  getChildHomeData,
  setupChildProfile,
} from "../services/child.service";

import {
  CHILD_SESSION_COOKIE,
  childClearCookieOptions,
  childCookieOptions,
  createChildSessionToken,
} from "../lib/auth/child-session";

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
        message: "Permintaan persetujuan tidak ditemukan.",
      });
    }

    if (code === "CONSENT_GUARDIAN_MISMATCH") {
      return res.status(403).json({
        success: false,
        message: "Persetujuan bukan milik akun orang tua yang sedang masuk.",
      });
    }

    if (code === "CONSENT_NOT_APPROVED") {
      return res.status(403).json({
        success: false,
        message: "Persetujuan orang tua belum disetujui.",
      });
    }

    if (code === "CONSENT_EXPIRED") {
      return res.status(410).json({
        success: false,
        message: "Persetujuan sudah kedaluwarsa.",
      });
    }

    console.error("Setup child error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal membuat profil anak.",
    });
  }
}

export async function loginChild(req: Request, res: Response) {
  try {
    const { username, pin } = req.body;

    if (typeof username !== "string" || typeof pin !== "string") {
      return res.status(400).json({
        success: false,
        message: "Username dan PIN diperlukan.",
      });
    }

    const child = await authenticateChild(username, pin);

    if (!child) {
      return res.status(401).json({
        success: false,
        message: "Username atau PIN tidak valid.",
      });
    }

    const token = await createChildSessionToken(child.id);

    res.cookie(CHILD_SESSION_COOKIE, token, childCookieOptions);

    return res.status(200).json({
      success: true,

      data: {
        child,
      },
    });
  } catch (error) {
    console.error("Child login error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal masuk ke akun.",
    });
  }
}

export async function getMyChild(req: Request, res: Response) {
  try {
    const childId = res.locals.childId as string;

    const result = await getChildHomeData(childId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Profil anak tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get child me error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil profil anak.",
    });
  }
}

export async function logoutChild(req: Request, res: Response) {
  res.clearCookie(CHILD_SESSION_COOKIE, childClearCookieOptions);

  return res.status(200).json({
    success: true,
  });
}
