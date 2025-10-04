import { User } from "@prisma/client";

const credentialLogin = async (payload: Partial<User>) => {
  const { email, password } = payload;

//   const isUserExits = await User.findOne({ phone }).populate("wallet");

//   if (!isUserExits) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "Phone number does not exits. Please Register Before Login"
//     );
//   }

//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExits.password
//   );

//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
//   }

//   const userToken = createUserToken(isUserExits);

//   // delete isUserExit.password;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...res } = isUserExits.toObject();

//   return {
//     accessToken: userToken.accessToken,
//     refreshToken: userToken.refreshToken,
//     user: res,
//   };
};




export const AuthServices = {
  credentialLogin,

};
