import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'



const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.credentialLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Success",
    data: user,
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



export const AuthControllers = {
  credentialLogin,
  logout
};
