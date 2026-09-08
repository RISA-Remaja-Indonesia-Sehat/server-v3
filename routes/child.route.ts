import { Router } from "express";

import {
  guardianAuth,
} from "../middleware/guardianAuth.middleware";

import {
  setupChild,
} from "../controllers/child.controller";

const router = Router();

router.post(
  "/setup",
  guardianAuth,
  setupChild
);

export default router;