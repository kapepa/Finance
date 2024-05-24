"use server"

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/services/user";
import { AuthError } from "next-auth";
import { z } from "zod"

const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  if (!result.success) return { error: "Invalid fields!" };
  const { email, password } = result.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) return { error: "Email isn't exist" };
  if (!existingUser.emailVerified) { 
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail({ email: verificationToken.email, token: verificationToken.token })

    return { success: "Confirmation email sent" }
  } 

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