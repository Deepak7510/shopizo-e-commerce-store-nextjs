import axiosInstance from "@/lib/axios"

export interface resetPasswordServiceValues {
    password: string;
    confirmPassword: string;
    token: string;

}

export const resetPasswordService = async function (value: resetPasswordServiceValues): Promise<any> {
    try {
        const resposne = await axiosInstance.post('/api/auth/reset-password', value)
        return resposne.data
    } catch (error: any) {
        return error.response.data
    }
}