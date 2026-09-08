import { Router } from "express";

import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware";

import {
  getMyProfile,
} from "../controllers/profile.controller";

const router = Router();

router.get(
  "/",
  guardianAuth,
  getMyProfile,
);

export default router;