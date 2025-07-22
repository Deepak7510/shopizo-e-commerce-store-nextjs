import axiosInstance from "@/lib/axios"

export interface optVerifyServiceValue {
    otp: string,
    email: string,
}

export const optVerifyService = async function (value: optVerifyServiceValue): Promise<any> {
    try {
        const response = await axiosInstance.post('/api/auth/verify-otp', value);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}