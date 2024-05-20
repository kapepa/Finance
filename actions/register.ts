"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { hash } from "bcryptjs"
import prisma from "@/lib/db"
import { getUserByEmail } from "@/services/user"

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

  return { success: "Created an account" }
}

export { register }