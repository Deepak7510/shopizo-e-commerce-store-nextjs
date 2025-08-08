import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const checkAuthService = async function (): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.get('/api/auth/check-auth');
        return response.data;
    } catch (error: any) {
        console.log("Error from API:", error);
        return error?.response?.data;
    }
}
