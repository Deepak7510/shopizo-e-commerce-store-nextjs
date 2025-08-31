import axiosInstance from "@/lib/client/axios"
import { TypeOfEditProductInput } from "@/types/admin.products.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateProductService = async function (value: TypeOfEditProductInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/products/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}