import { Prisma, Projects } from "@prisma/client";
import { prisma } from "../../config/db";
import { generateSlug } from "../../utils/generateSlug";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createProject = async (
  payload: Prisma.ProjectsCreateInput
): Promise<Projects> => {
  const { title, slug, tags, ...rest } = payload;
  let generatedSlug = generateSlug(title);
  let count = 0;
  let uniqueSlug = generatedSlug;

  while (await prisma.projects.findUnique({ where: { slug: uniqueSlug } })) {
    count++;
    uniqueSlug = `${generatedSlug}-${count}`;
  }

  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.toLowerCase())
    : [];

  const createProject = await prisma.projects.create({
    data: {
      title,
      slug: uniqueSlug,
      tags: normalizedTags,
      ...rest,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
  return createProject;
};

const allProjects = async ({
  page = 1,
  limit = 5,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
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
  const projects = await prisma.projects.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const total = await prisma.projects.count({ where });

  return {
    data: projects,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleProject = async (slug: string) => {
  return await prisma.$transaction(async (tx) => {
    const project = await prisma.projects.findUnique({ where: { slug } });
    if (!project) {
      throw new AppError(httpStatus.NOT_FOUND, "This project is not found");
    }

    await tx.projects.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return await tx.projects.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  });
};

const updateProject = async (slug: string, data: Partial<Projects>) => {
  const project = await prisma.projects.findUnique({ where: { slug } });
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "This project is not found");
  }

  const { slug: isSlug } = data;

  if (isSlug) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slug cannot be update");
  }

  return prisma.projects.update({ where: { slug }, data });
};

const deleteProject = async (slug: string) => {
  const project = await prisma.projects.findUnique({ where: { slug } });
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "This project is not found");
  }
  return prisma.projects.delete({ where: { slug } });
};

export const ProjectServices = {
  createProject,
  allProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
