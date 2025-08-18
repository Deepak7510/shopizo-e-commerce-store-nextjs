import axiosInstance from "@/lib/client/axios"
import { TypeOfAddProductVarinatInput } from "@/types/admin.productvariants.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const createproductVariantService = async function (value: TypeOfAddProductVarinatInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/product-variants/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}