import { Router } from "express";

import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware.js";

import {
  getMyProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.get(
  "/",
  guardianAuth,
  getMyProfile,
);

export default router;