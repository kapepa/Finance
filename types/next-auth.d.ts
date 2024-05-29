import { LoginSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"
import { z } from "zod";

export type UserAuth = {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
} & DefaultSession["user"]

declare module "next-auth" {
  interface Session {
    user: UserAuth & DefaultSession["user"]
  }
  interface User extends DefaultUser  {
    id: string
    emailVerified: Date
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}