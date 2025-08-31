import axiosInstance from "@/lib/client/axios";
import { TypeOfVerifyOtpInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const forgetVerifyOtpService = async function (data: TypeOfVerifyOtpInput): Promise<TypeOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/auth/forget-password/verify-otp', data)
        return resposne.data
    } catch (error: any) {
        console.error("Error from API:", error);
        return error.response.data
    }
}