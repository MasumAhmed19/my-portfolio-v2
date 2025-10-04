import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ExperienceServices } from "./experience.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await ExperienceServices.createExperience(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience created successfully",
    data: experience,
  });
});

const allExperiences = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
    : undefined;
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

  const experiences = await ExperienceServices.allExperiences({
    page,
    limit,
    isFeatured,
    tags,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All experiences retrieved successfully",
    data: experiences.data,
    meta: experiences.meta,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const experience = await ExperienceServices.updateExperience(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience updated successfully",
    data: experience,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const experience = await ExperienceServices.deleteExperience(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience deleted successfully",
    data: experience,
  });
});

export const ExperienceController = {
  createExperience,
  allExperiences,
  updateExperience,
  deleteExperience,
};
