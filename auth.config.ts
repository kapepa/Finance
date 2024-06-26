import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError, z } from "zod"
import { LoginSchema } from "./schemas"
import { compare } from "bcryptjs"
import { getUserByEmail, getUserById } from "./services/user"
import { UserRole } from "@prisma/client"
import prisma from "./lib/db";
import { Routers } from "./enum/routers";
import { deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from "./services/two-factor-confirmation";
import { getAccountByUserId } from "./services/account";

export default { 
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: Partial<Record<"email" | "password" | "code", unknown>>, request: Request) {
        try {
          const result = LoginSchema.safeParse(credentials);

          if (!result.success) return null
          const { email, password } = result.data;
  
          const existingUser = await getUserByEmail(email);
          if (!(existingUser && existingUser.password)) throw new Error("User not found.")
  
          const compareHash = await compare(password, existingUser.password);
          if (!compareHash) throw new Error("Passwprd is not valid")
  
          return existingUser as any
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
  pages: {
    signIn: Routers.Login,
    error: Routers.Error,
  },
  events: {
    async linkAccount ({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      if (!user || !user.emailVerified || !user.id) return false;

      if (!!user.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);
        if (!twoFactorConfirmation) return false;

        await deleteTwoFactorConfirmationById(twoFactorConfirmation.id);
      }

      return true
    },
    async session({ session, token }) {
      if (!!token.sub && !!session.user) session.user.id = token.sub;
      if (!!token.role && !!session.user) session.user.role = token.role as UserRole;
      if (!!session.user) session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      if (!!session.user && !!token.name) session.user.name = token.name;
      if (!!session.user && !!token.email) session.user.email = token.email;
      if (!!session.user) session.user.isOAuth = token.isOAuth as boolean || false ;

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token
    },
  }
} satisfies NextAuthConfig