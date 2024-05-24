"use server"

import { sendPasswordResetToken } from "@/lib/mail";
import { resetPassword } from "@/lib/reset-password";
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/services/user";
import { z } from "zod"

const reset = async (value: z.infer<typeof ResetSchema>) => {
  const result = ResetSchema.safeParse(value);
  if (!result.success) return { error: "Invalid email!" };

  const { email } = result.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };

  const resetPasswordToken = await resetPassword(email);

  await sendPasswordResetToken({ 
    email: resetPasswordToken.email, 
    token: resetPasswordToken.token, 
  });

  return { success: "Password reset sent in the mail" }
}

export { reset };