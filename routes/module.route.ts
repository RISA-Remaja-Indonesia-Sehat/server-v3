import { Router } from "express";

import { getLearningModule } from "../controllers/module.controller.js";

const router = Router();

router.get("/:chapterNumber", getLearningModule);

export default router;
