import axiosInstance from "@/lib/client/axios";
import { TypesOfEmailInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const resendOtpService = async function (value: TypesOfEmailInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/resend-otp', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}