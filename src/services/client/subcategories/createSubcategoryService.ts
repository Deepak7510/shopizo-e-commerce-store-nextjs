import axiosInstance from "@/lib/client/axios"
import { TypeOfAddSubcategoryInput } from "@/types/admin.subcategories.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const createSubcategoryService = async function (value: TypeOfAddSubcategoryInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/subcategories/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}