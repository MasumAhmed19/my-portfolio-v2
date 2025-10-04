import { Prisma, Experience } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createExperience = async (
  payload: Prisma.ExperienceCreateInput
): Promise<Experience> => {
  const { tags, ...rest } = payload;

  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.toLowerCase())
    : [];

  const experience = await prisma.experience.create({
    data: {
      ...rest,
      tags: normalizedTags,
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

  return experience;
};

const allExperiences = async ({
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

  const experiences = await prisma.experience.findMany({
    skip,
    take: limit,
    where,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.experience.count({ where });

  return {
    data: experiences,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateExperience = async (id: number, data: Partial<Experience>) => {
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  return prisma.experience.update({ where: { id }, data });
};

const deleteExperience = async (id: number) => {
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  return prisma.experience.delete({ where: { id } });
};

export const ExperienceServices = {
  createExperience,
  allExperiences,
  updateExperience,
  deleteExperience,
};
