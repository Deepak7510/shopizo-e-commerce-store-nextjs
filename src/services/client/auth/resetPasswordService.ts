import axiosInstance from "@/lib/client/axios";
import { TypeOfResetPasswordInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const resetPasswordService = async function (value: TypeOfResetPasswordInput): Promise<TypeOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/auth/reset-password', value)
        return resposne.data
    } catch (error: any) {
        console.error("Error from API:", error);
        return error.response.data
    }
}