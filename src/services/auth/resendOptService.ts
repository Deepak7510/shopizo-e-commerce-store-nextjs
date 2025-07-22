import axiosInstance from "@/lib/axios"

export interface resendOtpServiceValue {
    email: string;
}

export const resendOtpService = async function (value: resendOtpServiceValue): Promise<any> {
    try {
        const response = await axiosInstance.post('/api/auth/resend-otp', value);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}