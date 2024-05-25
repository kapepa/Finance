import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email must be correct.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  code: z.string().optional()
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email must be correct.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirm: z.string().min(6, {
    message: "Confirm password must be at least 6 characters.",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email must be correct.",
  }),
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirm: z.string().min(6, {
    message: "Confirm password must be at least 6 characters.",
  })
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
})
