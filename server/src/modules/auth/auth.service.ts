import { User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserToken } from "../../utils/userToken";

type CredentialPayload = { email: string; password: string };

const allowedFields = [
  "name",
  "avatar",
  "about",
  "website",
  "linkedin",
  "facebook",
  "github",
  "twitter",
  "phone",
  "location",
  "skills"
];

const credentialLogin = async (payload: CredentialPayload) => {
  const { email, password } = payload;

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect admin email");
  }
  // 411 --> Incorrect admin email
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    admin.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect Password"); // 412 --> Incorrect admin pass
  }

  const userToken = createUserToken(admin);
  const { password: _, ...res } = admin;

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: res,
  };
};

const getme = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      avatar: true,
      about: true,
      website: true,
      linkedin: true,
      facebook: true,
      github: true,
      twitter: true,
      phone: true,
      location: true,
      skills: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });

  return {
    data: user,
  };
};


const updateMe = async (email: string, payload: any) => {

  const data: any = {};
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      data[field] = payload[field];
    }
  }

  if (Object.keys(data).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No valid fields to update");
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data,
    select: {
      name: true,
      email: true,
      avatar: true,
      about: true,
      website: true,
      linkedin: true,
      facebook: true,
      github: true,
      twitter: true,
      phone: true,
      location: true,
      skills: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });

  return updatedUser;
};

export const AuthServices = {
  credentialLogin,
  getme,
  updateMe
};
