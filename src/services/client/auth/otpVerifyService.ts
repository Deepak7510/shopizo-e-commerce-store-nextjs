import axiosInstance from "@/lib/client/axios";
import { TypeOfVerifyOtpInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";


export const optVerifyService = async function (value: TypeOfVerifyOtpInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/verify-otp', value);
        return response.data
    } catch (error: any) {
        console.error("Error from API:", error);
        return error.response.data
    }
}