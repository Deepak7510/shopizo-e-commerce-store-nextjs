import axiosInstance from "@/lib/client/axios"
import { TypesOfAddSubcategoryInput } from "@/types/admin.subcategories.types"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"

export const createSubcategoryService = async function (value: TypesOfAddSubcategoryInput): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/subcategories/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}