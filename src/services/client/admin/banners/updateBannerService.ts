import axiosInstance from "@/lib/client/axios"
import { TypeOfEditBannerInput } from "@/types/admin.banners.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateBannerService = async function (value: TypeOfEditBannerInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/banners/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}