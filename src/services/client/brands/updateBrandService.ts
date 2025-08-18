import axiosInstance from "@/lib/client/axios"
import { TypeOfEditBrandInput } from "@/types/admin.brands.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateBrandService = async function (value: TypeOfEditBrandInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/brands/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}