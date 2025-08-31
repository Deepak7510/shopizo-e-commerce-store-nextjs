import axiosInstance from "@/lib/client/axios"
import { TypeOfAddProductInput } from "@/types/admin.products.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const createProductService = async function (value: TypeOfAddProductInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/products/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}