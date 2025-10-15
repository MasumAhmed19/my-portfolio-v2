import { Prisma, Posts } from "@prisma/client";
import { prisma } from "../../config/db";
import { generateSlug } from "../../utils/generateSlug";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createPost = async (payload: Prisma.PostsCreateInput): Promise<Posts> => {
  const { title, tags, author, slug, content, ...rest } = payload;
  if (!content) {
    throw new AppError(httpStatus.BAD_REQUEST, "Content is required");
  }

    // Validate content is proper JSON (optional but recommended)
  if (typeof content !== 'object' || content === null || !('type' in content)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid content format");
  }

  let generatedSlug = generateSlug(title);
  let count = 0;
  let uniqueSlug = generatedSlug;

  while (await prisma.posts.findUnique({ where: { slug: uniqueSlug } })) {
    count++;
    uniqueSlug = `${generatedSlug}-${count}`;
  }

  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.toLowerCase())
    : [];

  const post = await prisma.posts.create({
    data: {
      title,
      slug: uniqueSlug,
      tags: normalizedTags,
      content,
      ...rest,
      authorId: 1,
    },
    include: {
      author: {
        select: { name: true, email: true, avatar: true },
      },
    },
  });

  return post;
};

const allPosts = async ({
  page = 1,
  limit = 5,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;
  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.toLowerCase())
    : [];

  const where: any = {
    AND: [
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: normalizedTags } },
    ].filter(Boolean),
  };

  const posts = await prisma.posts.findMany({
    skip,
    take: limit,
    where,
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true, avatar: true } } },
  });

  const total = await prisma.posts.count({ where });

  return {
    data: posts,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getSinglePost = async (slug: string) => {
  return await prisma.$transaction(async (tx) => {
    const post = await tx.posts.findUnique({ where: { slug } });
    if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post not found");

    await tx.posts.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return await tx.posts.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, email: true, avatar: true } },
      },
    });
  });
};

const updatePost = async (slug: string, data: Prisma.PostsUpdateInput) => {
  const post = await prisma.posts.findUnique({ where: { slug } });
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post not found");

  // Slug immutable
  if (data.slug)
    throw new AppError(httpStatus.BAD_REQUEST, "Slug cannot be updated");

  return prisma.posts.update({
    where: { slug },
    data,
    include: { author: { select: { name: true, email: true, avatar: true } } },
  });
};

const deletePost = async (slug: string) => {
  const post = await prisma.posts.findUnique({ where: { slug } });
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post not found");

  return prisma.posts.delete({ where: { slug } });
};

export const PostServices = {
  createPost,
  allPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
