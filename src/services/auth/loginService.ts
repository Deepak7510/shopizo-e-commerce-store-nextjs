import axiosInstance from "@/lib/axios"

export interface loginServiceValue {
    email: string;
    password: string;
}

const loginService = async function (value: loginServiceValue): Promise<any> {
    try {
        const response = await axiosInstance.post('/api/auth/login', value);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export default loginService