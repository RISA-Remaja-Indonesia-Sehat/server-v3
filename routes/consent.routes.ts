import { Router } from "express";

import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware";

import {
  approveConsent,
} from "../controllers/consent.controller";

const router = Router();

router.post(
  "/approve",
  guardianAuth,
  approveConsent
);

export default router;