import { User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus  from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserToken } from "../../utils/userToken";

type CredentialPayload = { email: string; password: string };


const credentialLogin = async (payload: CredentialPayload) => {
  const { email, password } = payload;

  const admin = await prisma.user.findUnique({
    where:{
      email
    }
  });

  if(!admin){
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect admin email");
  }
  // 411 --> Incorrect admin email
  const isPasswordMatched = await bcryptjs.compare(password as string, admin.password)


  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect Password");   // 412 --> Incorrect admin pass
  }

  const userToken = createUserToken(admin);
  const { password: _, ...res } = admin;

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: res,
  };
};


export const AuthServices = {
  credentialLogin,
};
