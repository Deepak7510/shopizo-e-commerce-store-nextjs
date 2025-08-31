import axiosInstance from "@/lib/client/axios";
import { TypeOfAddBrandInput } from "@/types/admin.brands.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const createBrandService = async function (value: TypeOfAddBrandInput): Promise<TypeOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/admin/brands/create', value);
        return resposne.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}