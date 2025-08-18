import axiosInstance from "@/lib/client/axios"
import { TypeOfEditSubcategoryInput } from "@/types/admin.subcategories.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateSubcategoryService = async function (value: TypeOfEditSubcategoryInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/subcategories/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}