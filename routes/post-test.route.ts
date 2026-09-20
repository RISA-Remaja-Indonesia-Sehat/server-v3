import { Router } from "express";

import {
  getPostTestQuestions,
  submitPostTest,
} from "../controllers/post-test.controller.js";
import { childAuth } from "../middleware/childAuth.middleware.js";

const router = Router();

router.get("/questions", childAuth, getPostTestQuestions);
router.post("/submit", childAuth, submitPostTest);

export default router;
