import axiosInstance from "@/lib/client/axios";
import { TypeOfAddBannerInput } from "@/types/admin.banners.types";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const createBannerService = async function (value: TypeOfAddBannerInput): Promise<TypeOfAxoisResponse> {
    try {
        const resposne = await axiosInstance.post('/api/admin/banners/create', value);
        return resposne.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}