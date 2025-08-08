import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const logoutService = async function (): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/logout');
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}