import axiosInstance from "@/lib/client/axios";
import { TypesOfVerifyOtpInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";


export const optVerifyService = async function (value: TypesOfVerifyOtpInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/verify-otp', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}