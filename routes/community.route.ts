import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  createComment,
  createPost,
  likePost,
  listComments,
  listPosts,
  removeComment,
  removePost,
  unlikePost,
} from "../controllers/community.controller.js";
import { childAuth } from "../middleware/childAuth.middleware.js";

const communityWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Kamu terlalu sering mengirim. Istirahat sebentar, lalu coba lagi.",
  },
});

const router = Router();

router.use(childAuth);

router.get("/posts", listPosts);
router.post("/posts", communityWriteLimiter, createPost);
router.delete("/posts/:postId", communityWriteLimiter, removePost);

router.get("/posts/:postId/comments", listComments);
router.post(
  "/posts/:postId/comments",
  communityWriteLimiter,
  createComment,
);
router.delete(
  "/comments/:commentId",
  communityWriteLimiter,
  removeComment,
);

router.post("/posts/:postId/like", communityWriteLimiter, likePost);
router.delete("/posts/:postId/like", communityWriteLimiter, unlikePost);

export default router;
