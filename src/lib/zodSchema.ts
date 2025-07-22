import { z } from "zod"

export const commonValidationSchema = z.object({
  name: z.string().nonempty("Full name is required.").min(3, "Name must be atleast 4 character"),
  email: z.string().nonempty("Email is required.").email("Enter a valid email."),
  password: z.string().nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().nonempty("Confirm password is required."),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  token: z.string().nonempty("Token is required."),
});
export const registerValidateSchema = commonValidationSchema.pick({
  name: true,
  email: true,
  password: true
});

export const loginValidateSchema = commonValidationSchema.pick({
  email: true,
  password: true
});

export const optValidationSchema = commonValidationSchema.pick({
  otp: true
});

export const emailValidationSchema = commonValidationSchema.pick({
  email: true
});

export const verifyOptValidationSchema = commonValidationSchema.pick({
  email: true,
  otp: true
});

export const resetPasswordValidationSchema = commonValidationSchema.pick({
  password: true,
  confirmPassword: true
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
