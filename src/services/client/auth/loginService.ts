import axiosInstance from "@/lib/client/axios";
import { TypeOfLoginInput } from "@/types/auth.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

const loginService = async function (value: TypeOfLoginInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/auth/login', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}

export default loginService