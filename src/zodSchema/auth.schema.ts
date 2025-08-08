import z from "zod";
import commonZodSchema from "./common.schema";

export const registerZodSchema = commonZodSchema.pick({
    name: true,
    email: true,
    password: true
})

export const loginZodSchema = commonZodSchema.pick({
    email: true,
    password: true
})

export const verifyOtpZodSchema = commonZodSchema.pick({
    email: true,
    otp: true
})

export const resetPasswordZodSchema = commonZodSchema.pick({
    password: true,
    confirmPassword: true,
}).extend({
    token: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const otpZodSchema = commonZodSchema.pick({
    otp: true
})

export const emailZodSchema = commonZodSchema.pick({
    email: true
});

