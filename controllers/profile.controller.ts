import type {
  Request,
  Response,
} from "express";

import {
  getOrCreateGuardian,
} from "../services/profile.service";

export async function getMyProfile(
  req: Request,
  res: Response,
) {
  try {
    const guardianId =
      res.locals.guardianId as string;

    const authUser =
      res.locals.authUser;

    const guardian =
      await getOrCreateGuardian(guardianId);

    return res.status(200).json({
      success: true,

      data: {
        guardian: {
          id: guardian.id,

          // Email berasal dari Supabase Auth,
          // tidak perlu kita simpan dua kali di Prisma.
          email: authUser.email ?? null,

          createdAt: guardian.createdAt,
          updatedAt: guardian.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil profil.",
    });
  }
}