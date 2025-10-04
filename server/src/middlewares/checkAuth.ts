import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { prisma } from "../config/db";


export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      
      if (!accessToken) {
        throw new AppError(403, "No Token Recieved", "");
      }

      const verifiedToken = verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as JwtPayload;

      const isUserExit = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });

      if (!isUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist", "");
      }

      if (!authRole.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view these data", "");
      }
      
      req.user = verifiedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
