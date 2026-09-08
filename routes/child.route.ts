import { Router } from "express";
import rateLimit from "express-rate-limit";

import { guardianAuth } from "../middleware/guardianAuth.middleware";

import {
  getMyChild,
  loginChild,
  logoutChild,
  setupChild,
} from "../controllers/child.controller";

import { childAuth } from "../middleware/childAuth.middleware";

const childLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 10,

  skipSuccessfulRequests: true,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Silakan coba lagi nanti.",
  },
});

const router = Router();

router.post("/setup", guardianAuth, setupChild);

router.post("/login", childLoginLimiter, loginChild);

router.get("/me", childAuth, getMyChild);

router.post("/logout", logoutChild);

export default router;
