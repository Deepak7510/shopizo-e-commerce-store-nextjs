import axiosInstance from "@/lib/client/axios"
import { TypesOfEditSubcategoryInput } from "@/types/admin.subcategories.types"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateSubcategoryService = async function (value: TypesOfEditSubcategoryInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/subcategories/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}