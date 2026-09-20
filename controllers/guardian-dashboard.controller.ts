import type {
  Request,
  Response,
} from "express";

import {
  getGuardianDashboardData,
} from "../services/guardian-dashboard.service.js";

export async function getGuardianDashboard(
  req: Request,
  res: Response,
) {
  try {
    const guardianId =
      res.locals.guardianId as string;

    const authUser =
      res.locals.authUser;

    const children =
      await getGuardianDashboardData(
        guardianId,
      );

    return res.status(200).json({
      success: true,
      data: {
        guardian: {
          id: guardianId,
          email: authUser.email ?? null,
        },
        children,
      },
    });
  } catch (error) {
    console.error(
      "Get guardian dashboard error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil data dashboard.",
    });
  }
}
