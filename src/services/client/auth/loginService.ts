import axiosInstance from "@/lib/client/axios";
import { TypesOfLoginInput } from "@/types/auth.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

const loginService = async function (value: TypesOfLoginInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/login', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}

export default loginService