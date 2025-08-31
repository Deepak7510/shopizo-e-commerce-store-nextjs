import axiosInstance from "@/lib/client/axios"
import { TypeOfEditCouponInput } from "@/types/admin.coupons.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const updateCouponService = async function (value: TypeOfEditCouponInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.put('/api/admin/coupons/update', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}