import { Role, User, Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import bcryptjs from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isAdminExit = await prisma.user.findUnique({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
    });

    if (isAdminExit) {
      console.log("Admin already exists");
      return;
    }

    console.log("Trying to create Admin... ");
    const hashedPassword = await bcryptjs.hash(
      process.env.ADMIN_PASS!,
      Number(process.env.BCRYPT_SALT_ROUND)
    );

    const payload: Prisma.UserCreateInput = {
      name: "Masum Ahmed",
      role: Role.ADMIN,
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
    };

    const admin = await prisma.user.create({ data: payload });
    console.log("Super Admin created successfully", admin);
  } catch (error) {
    console.log("Error in creating admin-->", error);
  }
};
