import {
  emailZodSchema,
  loginZodSchema,
  otpZodSchema,
  registerZodSchema,
  resetPasswordZodSchema,
  verifyOtpZodSchema,
} from "@/zodSchema/auth.schema";
import { z } from "zod";

// registerTypes
export type TypeOfRegisterInput = z.infer<typeof registerZodSchema>;

// loginTypes
export type TypeOfLoginInput = z.infer<typeof loginZodSchema>;

// resetPAsswordType
export type TypeOfResetPasswordInput = z.infer<typeof resetPasswordZodSchema>;

// verifyOtpType
export type TypeOfVerifyOtpInput = z.infer<typeof verifyOtpZodSchema>;

// otpType
export type TypeOfOtpInput = z.infer<typeof otpZodSchema>;

// emailType
export type TypeOfEmailInput = z.infer<typeof emailZodSchema>;
