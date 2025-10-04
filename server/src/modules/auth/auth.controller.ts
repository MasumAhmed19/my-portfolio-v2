import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'



const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.credentialLogin(req.body);

  setAuthCookie(res, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Success",
    data: user,
  });
});


export const AuthControllers = {
  credentialLogin,
};
