import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RISA API is running",
  });
});

router.get("/database", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connection is working",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;