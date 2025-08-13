import axiosInstance from "@/lib/client/axios"
import { TypesOfEditCategoryInput } from "@/types/admin.category.types"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateCategoryService = async function (value: TypesOfEditCategoryInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/categories/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}