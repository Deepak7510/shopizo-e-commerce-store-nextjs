import axiosInstance from "@/lib/client/axios";
import { TypesOfResetPasswordInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const resetPasswordService = async function (value: TypesOfResetPasswordInput): Promise<TypesOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/auth/reset-password', value)
        return resposne.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}