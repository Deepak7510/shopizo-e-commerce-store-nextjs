import axiosInstance from "@/lib/client/axios"
import { TypeOfEditProductVarinatInput } from "@/types/admin.productvariants.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateProductVariantService = async function (value: TypeOfEditProductVarinatInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/product-variants/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}