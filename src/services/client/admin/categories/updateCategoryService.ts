import axiosInstance from "@/lib/client/axios"
import { TypeOfEditCategoryInput } from "@/types/admin.category.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateCategoryService = async function (value: TypeOfEditCategoryInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/categories/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}