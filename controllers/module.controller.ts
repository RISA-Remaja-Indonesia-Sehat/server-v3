import type {
  Request,
  Response,
} from "express";

import {
  getLearningModuleByChapter,
} from "../services/module.service.js";

export async function getLearningModule(
  req: Request,
  res: Response
) {
  try {
    const chapterNumber =
      Number(
        req.params.chapterNumber
      );

    if (
      !Number.isInteger(
        chapterNumber
      ) ||
      chapterNumber < 1 ||
      chapterNumber > 7
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Chapter number tidak valid.",
      });
    }

    const data =
      await getLearningModuleByChapter(
        chapterNumber
      );

    if (!data) {
      return res.status(404).json({
        success: false,
        message:
          "Learning module tidak ditemukan.",
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "getLearningModule error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil learning module.",
    });
  }
}