import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

const emailVerifylinkService = async function (token: string): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post(`/api/auth/email-verifylink/${token}`);
        return response.data
    } catch (error: any) {
        console.error("Error from API:", error);
        return error.response.data
    }
}

export default emailVerifylinkService;