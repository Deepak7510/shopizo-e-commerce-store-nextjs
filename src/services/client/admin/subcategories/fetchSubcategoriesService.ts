import axiosInstance from "@/lib/client/axios"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"
import { TypeOfDeleteType } from "@/types/global.types"

export const fetchSubcategoriesService = async function (deleteType: TypeOfDeleteType): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.get(`/api/admin/subcategories?deleteType=${deleteType}`)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}