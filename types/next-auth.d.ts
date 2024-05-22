import { LoginSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser  {
    id: string
    emailVerified: any
  }
}