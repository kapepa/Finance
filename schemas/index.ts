import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email must be correct.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})


export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email must be correct.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  })
})