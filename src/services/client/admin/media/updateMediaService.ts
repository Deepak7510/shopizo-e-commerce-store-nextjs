import axiosInstance from "@/lib/client/axios";
import { TypeOfEditMedia } from "@/types/admin.media.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const updateMediaService = async function (value: TypeOfEditMedia): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put(`/api/admin/media/update`, value);
        return response.data
    } catch (error: any) {
        throw error.response.data || error.message;
    }
}