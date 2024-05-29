import { UserRole } from "@prisma/client";
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

export const SettingsSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  }).optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).optional(),
  email: z.string().email({
    message: "Email must be correct.",
  }).optional(),
  oldPassword: z.union(
    [z.string().min(6, { message: "Password must be at least 6 characters."}), z.string().length(0), ]
  ).optional().transform(e => e === "" ? undefined : e),
  password: z.union(
    [z.string().min(6, { message: "Password must be at least 6 characters."}), z.string().length(0), ]
  ).optional().transform(e => e === "" ? undefined : e),
  confirm: z.union(
    [z.string().min(6, { message: "Password must be at least 6 characters."}), z.string().length(0), ]
  ).optional().transform(e => e === "" ? undefined : e),
}).refine((data) => {
  if ( !data.password && !data.oldPassword ) return true;
  return !!data.password && !!data.oldPassword;
}, {
  message: "Passwords is required",
  path: ["password"],
}).refine((data) => {
  if ( !data.password && !data.confirm ) return true;
  return data.password === data.confirm
}, {
  message: "Passwords don't match",
  path: ["confirm"],
})
