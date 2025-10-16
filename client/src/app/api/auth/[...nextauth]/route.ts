import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    accessToken?: string;
  }

  interface Session {
    user?: User;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: User;
  }
}


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Call your backend API directly (not Next.js internal API)
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin-login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const token = data?.data?.accessToken;
          const user = data?.data?.user;

          if (token && user) {
            return {
              id: data.data.user.id || data.data.user.email,
              accessToken: token,
              name: data.data.user.name,
              email: data.data.user.email,
              role: data.data.user.role,
            };
          }
          return null;
        } catch (error) {
          const errorMessage = axios.isAxiosError(error) 
            ? error.response?.data || error.message 
            : error instanceof Error 
            ? error.message 
            : "Unknown error";
          console.error("Authorize error:", errorMessage);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/admin-login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

