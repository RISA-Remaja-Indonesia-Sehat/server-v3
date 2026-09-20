import type { Request, Response } from "express";

import {
  getPostTestForChild,
  gradePostTest,
} from "../services/post-test.service.js";

function handlePostTestError(error: unknown, res: Response) {
  const code = error instanceof Error ? error.message : "";

  if (code === "POST_TEST_LOCKED") {
    return res.status(403).json({
      success: false,
      message: "Selesaikan Chapter 1–7 sebelum membuka Post Test.",
    });
  }

  if (code === "POST_TEST_NOT_READY") {
    return res.status(503).json({
      success: false,
      message: "Soal Post Test belum tersedia.",
    });
  }

  if (code === "INVALID_ANSWERS") {
    return res.status(400).json({
      success: false,
      message: "Jawaban Post Test belum lengkap atau tidak valid.",
    });
  }

  if (code === "QUESTION_SET_CHANGED") {
    return res.status(409).json({
      success: false,
      message: "Soal Post Test telah diperbarui. Muat ulang halaman lalu coba lagi.",
    });
  }

  console.error("Post Test error:", error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan saat memproses Post Test.",
  });
}

export async function getPostTestQuestions(req: Request, res: Response) {
  try {
    const childId = res.locals.childId as string;
    const data = await getPostTestForChild(childId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return handlePostTestError(error, res);
  }
}

export async function submitPostTest(req: Request, res: Response) {
  try {
    const childId = res.locals.childId as string;
    const { contentVersion, answers } = req.body ?? {};
    const data = await gradePostTest(childId, contentVersion, answers);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return handlePostTestError(error, res);
  }
}
