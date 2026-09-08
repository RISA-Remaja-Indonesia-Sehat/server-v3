import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { supabaseAdmin } from "../config/supabase";

export async function guardianAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Token autentikasi tidak ditemukan.",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message:
          "Format token autentikasi tidak valid.",
      });
    }

    const token =
      authHeader.substring(7);

    const {
      data: { user },
      error,
    } =
      await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message:
          "Sesi tidak valid atau sudah berakhir.",
      });
    }

    res.locals.guardianId = user.id;
    res.locals.authUser = user;

    next();
  } catch (error) {
    console.error(
      "Guardian authentication error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal memverifikasi pengguna.",
    });
  }
}