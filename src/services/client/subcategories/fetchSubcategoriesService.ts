import axiosInstance from "@/lib/client/axios"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"
import { TypesOfDeleteType } from "@/types/global.types"

export const fetchSubcategoriesService = async function (deleteType: TypesOfDeleteType): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.get(`/api/admin/subcategories?deleteType=${deleteType}`)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}