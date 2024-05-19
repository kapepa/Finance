import { RegisterSchema } from "@/schemas"
import { z } from "zod"

const register = async (value: z.infer<typeof RegisterSchema>) => {
  const result = RegisterSchema.safeParse(value);
  if (!result.success) return { error: "Invalid fields!" }

  return { success: "Created an account" }
}

export { register }