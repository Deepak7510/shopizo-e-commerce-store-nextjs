import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypeOfDeleteType } from "@/types/global.types";

export const fetchMediaService = async function (page: number | string, deleteType: TypeOfDeleteType): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.get(`/api/admin/media?page=${page}&&limit=10&&deleteType=${deleteType}`);
        return response.data
    } catch (error: any) {
        throw error.response.data || error.message;
    }
}