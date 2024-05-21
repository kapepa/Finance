import { LoginSchema } from "@/schemas";
import NextAuth, { DefaultSession } from "next-auth"
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user: {

    } & DefaultSession["user"]
  }
}