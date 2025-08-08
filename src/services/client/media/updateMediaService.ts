import axiosInstance from "@/lib/client/axios";
import { TypesOfEditMedia } from "@/types/admin.media.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const updateMediaService = async function (value: TypesOfEditMedia): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.put(`/api/admin/media/update`, value);
        return response.data
    } catch (error: any) {
        throw error.response.data || error.message;
    }
}