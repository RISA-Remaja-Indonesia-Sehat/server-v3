import {
  CommunityCategory,
  Prisma,
} from "../generated/prisma/client.js";

import { prisma } from "../config/prisma.js";
import { moderateCommunityPost, CommunityModerationError } from "./community-moderation.service.js";

const POST_PAGE_SIZE = 12;
const MAX_TITLE_LENGTH = 80;
const MAX_POST_LENGTH = 500;
const MAX_COMMENT_LENGTH = 300;

const authorSelect = {
  username: true,
  avatarId: true,
} satisfies Prisma.ChildProfileSelect;

type CreatePostInput = {
  childId: string;
  title?: unknown;
  content: unknown;
  category: unknown;
  isAnonymous?: unknown;
};

type CreateCommentInput = {
  childId: string;
  postId: string;
  content: unknown;
  isAnonymous?: unknown;
};

function cleanOptionalTitle(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new Error("INVALID_TITLE");
  }

  const title = value.trim();

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error("INVALID_TITLE");
  }

  return title || null;
}

function cleanText(value: unknown, maxLength: number, errorCode: string) {
  if (typeof value !== "string") {
    throw new Error(errorCode);
  }

  const text = value.trim();

  if (!text || text.length > maxLength) {
    throw new Error(errorCode);
  }

  return text;
}

function parseCategory(value: unknown) {
  if (
    typeof value !== "string" ||
    !Object.values(CommunityCategory).includes(
      value as CommunityCategory,
    )
  ) {
    throw new Error("INVALID_CATEGORY");
  }

  return value as CommunityCategory;
}

function parsePage(value: unknown) {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

function publicAuthor(
  isAnonymous: boolean,
  child: { username: string; avatarId: string },
) {
  return isAnonymous ? null : child;
}

export async function getCommunityPosts({
  childId,
  category,
  page,
}: {
  childId: string;
  category?: unknown;
  page?: unknown;
}) {
  const selectedCategory =
    category === undefined || category === "ALL"
      ? undefined
      : parseCategory(category);
  const currentPage = parsePage(page);

  const where = selectedCategory
    ? { category: selectedCategory }
    : undefined;

  const [posts, total] = await prisma.$transaction([
    prisma.communityPost.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (currentPage - 1) * POST_PAGE_SIZE,
      take: POST_PAGE_SIZE,
      include: {
        child: { select: authorSelect },
        likes: {
          where: { childId },
          select: { childId: true },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    }),
    prisma.communityPost.count({ where }),
  ]);

  return {
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      isAnonymous: post.isAnonymous,
      author: publicAuthor(post.isAnonymous, post.child),
      isOwner: post.childId === childId,
      likedByMe: post.likes.length > 0,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })),
    pagination: {
      page: currentPage,
      pageSize: POST_PAGE_SIZE,
      total,
      hasMore: currentPage * POST_PAGE_SIZE < total,
    },
  };
}

export async function createCommunityPost(input: CreatePostInput) {
  const post = await prisma.communityPost.create({
    data: {
      childId: input.childId,
      title: cleanOptionalTitle(input.title),
      content: cleanText(input.content, MAX_POST_LENGTH, "INVALID_CONTENT"),
      category: parseCategory(input.category),
      isAnonymous: input.isAnonymous === true,
    },
    include: {
      child: { select: authorSelect },
    },
  });

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    isAnonymous: post.isAnonymous,
    author: publicAuthor(post.isAnonymous, post.child),
    isOwner: true,
    likedByMe: false,
    likeCount: 0,
    commentCount: 0,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export async function deleteCommunityPost(childId: string, postId: string) {
  const result = await prisma.communityPost.deleteMany({
    where: { id: postId, childId },
  });

  if (result.count === 0) {
    throw new Error("POST_NOT_FOUND_OR_FORBIDDEN");
  }
}

export async function getCommunityComments(childId: string, postId: string) {
  const postExists = await prisma.communityPost.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!postExists) {
    throw new Error("POST_NOT_FOUND");
  }

  const comments = await prisma.communityComment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    take: 50,
    include: {
      child: { select: authorSelect },
    },
  });

  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    isAnonymous: comment.isAnonymous,
    author: publicAuthor(comment.isAnonymous, comment.child),
    isOwner: comment.childId === childId,
    createdAt: comment.createdAt,
  }));
}

export async function createCommunityComment(
  input: CreateCommentInput,
) {
  const postExists =
    await prisma.communityPost.findUnique({
      where: {
        id: input.postId,
      },
      select: {
        id: true,
      },
    });

  if (!postExists) {
    throw new Error(
      "POST_NOT_FOUND",
    );
  }

  const cleanedContent =
    cleanText(
      input.content,
      MAX_COMMENT_LENGTH,
      "INVALID_COMMENT",
    );

  const moderation =
    await moderateCommunityPost({
      title: "",
      content: cleanedContent,
      category: "COMMENT",
    });

  if (
    moderation.decision !== "ALLOW"
  ) {
    throw new CommunityModerationError(
      moderation,
    );
  }

  const comment =
    await prisma.communityComment.create({
      data: {
        childId: input.childId,
        postId: input.postId,
        content: cleanedContent,
        isAnonymous:
          input.isAnonymous === true,
      },
      include: {
        child: {
          select: authorSelect,
        },
      },
    });

  return {
    id: comment.id,
    content: comment.content,
    isAnonymous:
      comment.isAnonymous,
    author: publicAuthor(
      comment.isAnonymous,
      comment.child,
    ),
    isOwner: true,
    createdAt: comment.createdAt,
  };
}

export async function deleteCommunityComment(
  childId: string,
  commentId: string,
) {
  const result = await prisma.communityComment.deleteMany({
    where: { id: commentId, childId },
  });

  if (result.count === 0) {
    throw new Error("COMMENT_NOT_FOUND_OR_FORBIDDEN");
  }
}

export async function likeCommunityPost(childId: string, postId: string) {
  const postExists = await prisma.communityPost.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!postExists) {
    throw new Error("POST_NOT_FOUND");
  }

  await prisma.communityLike.upsert({
    where: {
      childId_postId: { childId, postId },
    },
    create: { childId, postId },
    update: {},
  });
}

export async function unlikeCommunityPost(childId: string, postId: string) {
  await prisma.communityLike.deleteMany({
    where: { childId, postId },
  });
}
