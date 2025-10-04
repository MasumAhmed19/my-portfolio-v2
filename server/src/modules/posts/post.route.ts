import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";
import { PostController } from "./post.controller";

const router = Router();

router.post("/", checkAuth(Role.ADMIN), PostController.createPost);
router.get("/", PostController.allPosts);
router.get("/:slug", PostController.getSinglePost);

router.patch("/:slug", checkAuth(Role.ADMIN), PostController.updatePost);
router.delete("/:slug", checkAuth(Role.ADMIN), PostController.deletePost);

export const PostRoutes = router;
