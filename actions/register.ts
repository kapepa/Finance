"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { hash } from "bcryptjs"
import prisma from "@/lib/db"
import { getUserByEmail } from "@/services/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

const register = async (value: z.infer<typeof RegisterSchema>) => {
  const result = RegisterSchema.safeParse(value);
  if (!result.success) return { error: "Invalid fields!" }

  const { name, email, password } = result.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if (!!existingUser) return { error: "Email already in use!" }

  await prisma.user.create({
    data: {
      name,
      email, 
      password: hashedPassword, 
    }
  })

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail({ email: verificationToken.email, token: verificationToken.token })

  return { success: "Confirmation email sent!" }
}

export { register }