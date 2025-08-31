import axiosInstance from "@/lib/client/axios";
import { TypeOfAddColorInput } from "@/types/admin.colors.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const createColorService = async function (value: TypeOfAddColorInput): Promise<TypeOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/admin/colors/create', value);
        return resposne.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}