"use server"

import { LoginSchema } from "@/schemas"
import { z } from "zod"

const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  if (!result.success) return { error: "Invalid fields!" };

  return { success: "Email sent!" }
}

export { login }