import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypesOfDeleteType } from "@/types/global.types";

export const fetchBrandsService = async function (deleteType: TypesOfDeleteType): Promise<TypesOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.get(`/api/admin/brands?deleteType=${deleteType}`);
        return resposne.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}