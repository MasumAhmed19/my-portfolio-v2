
import { User } from "@prisma/client";
import { generateToken } from "./jwt";


export const createUserToken =  (user: Partial<User>)=>{
     const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    
      const accessToken = generateToken(jwtPayload, process.env.JWT_ACCESS_SECRET!, process.env.JWT_ACCESS_EXPIRES!);
      const refreshToken = generateToken(jwtPayload, process.env.JWT_REFRESH_SECRET!, process.env.JWT_REFRESH_EXPIRE!);
    
      return {
        accessToken,
        refreshToken
      }
}

