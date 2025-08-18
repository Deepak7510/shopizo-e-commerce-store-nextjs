import axiosInstance from "@/lib/client/axios";
import { TypeOfEmailInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const resendEmailVerifyLinkService = async function (value: TypeOfEmailInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/resend-email-verifylink', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}