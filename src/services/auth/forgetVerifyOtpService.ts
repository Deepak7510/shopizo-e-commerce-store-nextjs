import axiosInstance from "@/lib/axios"

export interface loginServiceValue {
    email: string;
    otp: string;
}

export const forgetVerifyOtpService = async function (data: loginServiceValue): Promise<any> {
    try {
        const resposne = await axiosInstance.post('/api/auth/forget-password/verify-otp', data)
        return resposne.data
    } catch (error: any) {
        return error.response.data
    }
}