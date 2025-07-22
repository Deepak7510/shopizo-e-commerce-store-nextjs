import axiosInstance from "@/lib/axios";

export interface registerServiceValues {
    name: string;
    email: string;
    password: string;
}

const registerService = async function (value: registerServiceValues): Promise<any> {
    try {
        const response = await axiosInstance.post('/api/auth/register', value);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export default registerService
