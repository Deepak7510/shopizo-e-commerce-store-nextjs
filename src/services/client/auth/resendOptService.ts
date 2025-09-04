import axiosInstance from "@/lib/client/axios";
import { TypeOfEmailInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const resendOtpService = async function (
  value: TypeOfEmailInput
): Promise<TypeOfAxoisResponse> {
  try {
    const response = await axiosInstance.post("/api/auth/resend-otp", value);
    return response.data;
  } catch (error: any) {
    console.error("Error from API:", error);
    return error.response.data;
  }
};
