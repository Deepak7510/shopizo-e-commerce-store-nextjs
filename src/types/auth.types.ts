import { emailZodSchema, loginZodSchema, otpZodSchema, registerZodSchema, resetPasswordZodSchema, verifyOtpZodSchema } from "@/zodSchema/auth.schema";
import { z } from "zod";

// registerTypes
export type TypesOfRegisterInput = z.infer<typeof registerZodSchema>


// loginTypes
export type TypesOfLoginInput = z.infer<typeof loginZodSchema>


// resetPAsswordType
export type TypesOfResetPasswordInput = z.infer<typeof resetPasswordZodSchema>


// verifyOtpType
export type TypesOfVerifyOtpInput = z.infer<typeof verifyOtpZodSchema>


// otpType
export type TypeOfOtpInput = z.infer<typeof otpZodSchema>



// emailType
export type TypesOfEmailInput = z.infer<typeof emailZodSchema>