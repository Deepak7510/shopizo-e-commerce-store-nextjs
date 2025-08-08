import axiosInstance from "@/lib/client/axios";
import { TypesOfVerifyOtpInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const forgetVerifyOtpService = async function (data: TypesOfVerifyOtpInput): Promise<TypesOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/auth/forget-password/verify-otp', data)
        return resposne.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}