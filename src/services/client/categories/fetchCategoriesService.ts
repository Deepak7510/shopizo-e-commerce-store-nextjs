import axiosInstance from "@/lib/client/axios"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types"
import { TypesOfDeleteType } from "@/types/global.types"

export const fetchCategoriesService = async function (deleteType: TypesOfDeleteType): Promise<TypesOfAxoisResponse> {
    try {
        const response = await axiosInstance.get(`/api/admin/categories?deleteType=${deleteType}`)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}