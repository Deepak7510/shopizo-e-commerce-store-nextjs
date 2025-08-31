import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const logoutService = async function (): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/logout');
        return response.data
    } catch (error: any) {
        console.error("Error from API:", error);
        return error.response.data
    }
}