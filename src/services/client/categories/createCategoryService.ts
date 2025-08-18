import axiosInstance from "@/lib/client/axios"
import { TypeOfAddCategoryInput } from "@/types/admin.category.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const createCategoryService = async function (value: TypeOfAddCategoryInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/categories/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}