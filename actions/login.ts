"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import { z } from "zod"

const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  if (!result.success) return { error: "Invalid fields!" };
  const { email, password } = result.data;

  try {
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });

    return { success: "The user is logged in" }
  } catch (err) {
    if ( err instanceof AuthError ) {
      switch (err.type) {
        case "CredentialsSignin": return { error: "Invalid credentials" };
        default: return { error: "Something went wrong" };
      }
    }

    throw err;
  }
}

export { login }