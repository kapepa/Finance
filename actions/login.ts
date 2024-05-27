"use server"

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { generateTwoFactorToken } from "@/lib/two-factor";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas"
import { deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { deleteTwoFactorTokenById, getTwoFactorTokenByEmail } from "@/services/two-factor-token";
import { getUserByEmail } from "@/services/user";
import { AuthError } from "next-auth";
import { z } from "zod"

const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  if (!result.success) return { error: "Invalid fields!" };
  const { email, password, code } = result.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) return { error: "Email isn't exist" };
  if (!existingUser.emailVerified) { 
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail({ email: verificationToken.email, token: verificationToken.token })

    return { success: "Confirmation email sent" }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(email);
      
      if (!twoFactorToken || twoFactorToken?.token !== code) return { error: "Invalid code" };
      
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code is expired" }

      await deleteTwoFactorTokenById(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
      if (existingConfirmation) await deleteTwoFactorConfirmationById(existingConfirmation.id);

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await sendTwoFactorTokenEmail({
        email: twoFactorToken.email,
        token: twoFactorToken.token,
      })
      return { isTwoFactor: true }
    }
  }

  try {
    await signIn("credentials", { email, password, code, redirectTo: DEFAULT_LOGIN_REDIRECT });

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