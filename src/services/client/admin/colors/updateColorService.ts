import axiosInstance from "@/lib/client/axios"
import { TypeOfEditColorInput } from "@/types/admin.colors.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateColorService = async function (value: TypeOfEditColorInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/colors/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}