import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError, z } from "zod"
import { LoginSchema } from "./schemas"
import { compare } from "bcryptjs"
import { getUserByEmail, getUserById } from "./services/user"
import { UserRole } from "@prisma/client"

export default { 
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>, request: Request) {
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
    GitHub, 
    Google,
  ],
  callbacks: {
    // async signIn({ user }) {
    //   if (!user || !user.emailVerified) return false;

    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token }) {
      if (!!token.sub && !!session.user) session.user.id = token.sub;
      if (!!token.role && !!session.user) session.user.role = token.role as UserRole;

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token
    }
  }
} satisfies NextAuthConfig