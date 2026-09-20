import type { Request, Response } from "express";

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

function sendCommunityError(res: Response, error: unknown) {
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
    const post = await createCommunityPost({
      childId: childIdFrom(res),
      title: req.body?.title,
      content: req.body?.content,
      category: req.body?.category,
      isAnonymous: req.body?.isAnonymous,
    });

    return res.status(201).json({ success: true, data: { post } });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function removePost(req: Request, res: Response) {
  try {
    await deleteCommunityPost(childIdFrom(res), req.params.postId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function listComments(req: Request, res: Response) {
  try {
    const comments = await getCommunityComments(
      childIdFrom(res),
      req.params.postId,
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
      postId: req.params.postId,
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
    await deleteCommunityComment(childIdFrom(res), req.params.commentId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    await likeCommunityPost(childIdFrom(res), req.params.postId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}

export async function unlikePost(req: Request, res: Response) {
  try {
    await unlikeCommunityPost(childIdFrom(res), req.params.postId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return sendCommunityError(res, error);
  }
}
