import axiosInstance from "@/lib/client/axios";
import { TypesOfRegisterInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

const registerService = async function (value: TypesOfRegisterInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/register', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}

export default registerService
