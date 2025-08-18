import axiosInstance from "@/lib/client/axios";
import { TypeOfRegisterInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

const registerService = async function (value: TypeOfRegisterInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/register', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}

export default registerService
