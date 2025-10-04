import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
import { JwtPayload } from "jsonwebtoken";




const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.credentialLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Success",
    data: user,
  });
});

const getme = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const result = await AuthServices.getme(decodedToken.email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Your profile Retrieved Successfully",
    data: result.data,
  });
});


const logout = catchAsync(async (req: Request, res: Response) => {
  // cookie use krle, clearCookie dite hbe
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logout successful. Please remove tokens client-side.",
    data: null
  });
});

const updateMe = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email; 
  const payload = req.body;

  const updatedUser = await AuthServices.updateMe(email, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});


export const AuthControllers = {
  credentialLogin,
  logout,
  getme,
  updateMe
};
