import { Router } from "express";

import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware.js";

import {
  approveConsent,
} from "../controllers/consent.controller.js";

const router = Router();

router.post(
  "/approve",
  guardianAuth,
  approveConsent
);

export default router;