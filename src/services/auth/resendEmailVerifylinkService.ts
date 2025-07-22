import axiosInstance from "@/lib/axios"

export interface resendEmailVerifyServiceValue {
    email: string;
}

export const resendEmailVerifyLinkService = async function (value: resendEmailVerifyServiceValue): Promise<any> {
    try {
        const response = await axiosInstance.post('/api/auth/resend-email-verifylink', value);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}