import type { Request, Response } from "express";
import { moderateCommunityPost, CommunityModerationError } from "../services/community-moderation.service.js";

import {
  createCommunityComment,
  createCommunityPost,
  deleteCommunityComment,
  deleteCommunityPost,
  getCommunityComments,
  getCommunityPosts,
  likeCommunityPost,
  unlikeCommunityPost,
} from "../services/community.service.js";

function childIdFrom(res: Response) {
  return res.locals.childId as string;
}

function idParam(req: Request, name: string) {
  const value = req.params[name];

  if (
    typeof value !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  ) {
    throw new Error("INVALID_RESOURCE_ID");
  }

  return value;
}

function sendCommunityError(res: Response, error: unknown) {
  if (error instanceof CommunityModerationError) {
    return res.status(422).json({
      success: false,
      code: "CONTENT_NEEDS_REVISION",
      message:
        error.moderation.decision === "REVISE"
          ? "Komentarmu perlu dirapikan sedikit."
          : "Komentar ini belum dapat dikirim.",
      moderation: error.moderation,
    });
  }
  const code = error instanceof Error ? error.message : "";

  const errors: Record<string, { status: number; message: string }> = {
    INVALID_TITLE: {
      status: 400,
      message: "Judul maksimal 80 karakter.",
    },
    INVALID_CONTENT: {
      status: 400,
      message: "Isi cerita wajib diisi dan maksimal 500 karakter.",
    },
    INVALID_COMMENT: {
      status: 400,
      message: "Komentar wajib diisi dan maksimal 300 karakter.",
    },
    INVALID_CATEGORY: {
      status: 400,
      message: "Kategori Temanku tidak valid.",
    },
    INVALID_RESOURCE_ID: {
      status: 400,
      message: "ID data Temanku tidak valid.",
    },
    POST_NOT_FOUND: {
      status: 404,
      message: "Postingan tidak ditemukan.",
    },
    POST_NOT_FOUND_OR_FORBIDDEN: {
      status: 404,
      message: "Postingan tidak ditemukan atau bukan milikmu.",
    },
    COMMENT_NOT_FOUND_OR_FORBIDDEN: {
      status: 404,
      message: "Komentar tidak ditemukan atau bukan milikmu.",
    },
  };

  const known = errors[code];

  if (known) {
    return res.status(known.status).json({
      success: false,
      message: known.message,
    });
  }

  console.error("Community error:", error);

  return res.status(500).json({
    success: false,
    message: "Temanku sedang mengalami kendala. Coba lagi nanti.",
  });
}

export async function listPosts(req: Request, res: Response) {
  try {
    const data = await getCommunityPosts({
      childId: childIdFrom(res),
      category: req.query.category,
      page: req.query.page,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const moderation = await moderateCommunityPost({
      title: req.body?.title,
      content: req.body?.content,
      category: req.body?.category,
    });

    if (moderation.decision !== "ALLOW") {
      return res.status(422).json({
        success: false,
        code: "CONTENT_NEEDS_REVISION",
        message:
          moderation.decision === "REVISE"
            ? "Tulisanmu perlu dirapikan sedikit."
            : "Tulisan ini belum dapat diposting.",
        moderation,
      });
    }

    const post = await createCommunityPost({
      childId: childIdFrom(res),
      title: req.body?.title,
      content: req.body?.content,
      category: req.body?.category,
      isAnonymous: req.body?.isAnonymous,
    });

    return res.status(201).json({
      success: true,
      data: { post },
    });
  } catch (error) {
    console.error(
      "Create community post error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return sendCommunityError(res, error);
  }
}

export async function removePost(req: Request, res: Response) {
  try {
    await deleteCommunityPost(childIdFrom(res), idParam(req, "postId"));
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function listComments(req: Request, res: Response) {
  try {
    const comments = await getCommunityComments(
      childIdFrom(res),
      idParam(req, "postId"),
    );

    return res.status(200).json({ success: true, data: { comments } });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function createComment(req: Request, res: Response) {
  try {
    const comment = await createCommunityComment({
      childId: childIdFrom(res),
      postId: idParam(req, "postId"),
      content: req.body?.content,
      isAnonymous: req.body?.isAnonymous,
    });

    return res.status(201).json({ success: true, data: { comment } });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function removeComment(req: Request, res: Response) {
  try {
    await deleteCommunityComment(childIdFrom(res), idParam(req, "commentId"));
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    await likeCommunityPost(childIdFrom(res), idParam(req, "postId"));
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function unlikePost(req: Request, res: Response) {
  try {
    await unlikeCommunityPost(childIdFrom(res), idParam(req, "postId"));
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}
