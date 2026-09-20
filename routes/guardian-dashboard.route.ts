import { Router } from "express";

import {
  getGuardianDashboard,
} from "../controllers/guardian-dashboard.controller.js";
import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware.js";

const router = Router();

router.get(
  "/",
  guardianAuth,
  getGuardianDashboard,
);

export default router;
