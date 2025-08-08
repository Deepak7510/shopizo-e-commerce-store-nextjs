import axiosInstance from "@/lib/client/axios";
import { TypedOfUploadMediaArray } from "@/types/admin.media.types";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";

export const createmediaService = async function (value: TypedOfUploadMediaArray): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/media/create', value);
        return response.data
    } catch (error: any) {
        console.log("Error from API:", error);
        return error.response.data
    }
}