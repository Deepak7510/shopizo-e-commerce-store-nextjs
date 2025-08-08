import axiosInstance from "@/lib/client/axios";
import { TypesOfAddBrandInput } from "@/types/admin.brands.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const createBrandService = async function (value: TypesOfAddBrandInput): Promise<TypesOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/admin/brands/create', value);
        return resposne.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}