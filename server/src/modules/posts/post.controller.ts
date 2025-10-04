import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await PostServices.createPost(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post created successfully",
    data: post,
  });
});

const allPosts = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
    : undefined;
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

  const posts = await PostServices.allPosts({
    page,
    limit,
    isFeatured,
    tags,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All posts retrieved successfully",
    data: posts.data,
    meta: posts.meta,
  });
});

const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const post = await PostServices.getSinglePost(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully",
    data: post,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const post = await PostServices.updatePost(slug, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: post,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const post = await PostServices.deletePost(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully",
    data: post,
  });
});

export const PostController = {
  createPost,
  allPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
