import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

const emailVerifylinkService = async function (token: string): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post(`/api/auth/email-verifylink/${token}`);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}

export default emailVerifylinkService;