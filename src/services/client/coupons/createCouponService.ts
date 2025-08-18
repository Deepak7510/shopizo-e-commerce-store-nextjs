import axiosInstance from "@/lib/client/axios"
import { TypeOfAddCouponInput } from "@/types/admin.coupons.types"
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types"

export const createCouponService = async function (value: TypeOfAddCouponInput): Promise<TypeOfAxoisResponse> {
    try {
        const response = await axiosInstance.post('/api/admin/coupons/create', value)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}