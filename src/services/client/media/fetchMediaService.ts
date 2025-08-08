import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypesOfDeleteType } from "@/types/global.types";

export const fetchMediaService = async function (page: number | string, deleteType: TypesOfDeleteType): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.get(`/api/admin/media?page=${page}&&limit=10&&deleteType=${deleteType}`);
        return response.data
    } catch (error: any) {
        throw error.response.data || error.message;
    }
}