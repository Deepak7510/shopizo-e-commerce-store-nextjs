import axiosInstance from "@/lib/client/axios"
import { TypesOfAddCategoryInput } from "@/types/admin.category.types"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"

export const createCategoryService = async function (value: TypesOfAddCategoryInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/categories/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}