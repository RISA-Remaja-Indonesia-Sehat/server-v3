import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  CHILD_SESSION_COOKIE,
  verifyChildSessionToken,
} from "../lib/auth/child-session";

export async function childAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies?.[
        CHILD_SESSION_COOKIE
      ];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Child belum login.",
      });
    }

    const childId =
      await verifyChildSessionToken(
        token
      );

    res.locals.childId =
      childId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message:
        "Session Child tidak valid atau sudah berakhir.",
    });
  }
}