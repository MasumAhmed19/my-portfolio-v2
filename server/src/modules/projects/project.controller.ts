import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const user = await ProjectServices.createProject(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project created successfully",
    data: user,
  });
});

const allProjects = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
    : undefined;
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  const projects = await ProjectServices.allProjects({
    page,
    limit,
    isFeatured,
    tags,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All projects retrieved successfully",
    data: projects.data,
    meta: projects.meta,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const project = await ProjectServices.getSingleProject(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project detail retrieved successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const project = await ProjectServices.updateProject(slug, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const slug: string = req.params.slug;
  const project = await ProjectServices.deleteProject(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: project,
  });
});

export const ProjectController = {
  createProject,
  allProjects,
  getSingleProject,
  updateProject,
  deleteProject
};
