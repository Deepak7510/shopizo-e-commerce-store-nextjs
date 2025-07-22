import axiosInstance from "@/lib/axios";

const emailVerifylinkService = async function (token: string): Promise<any> {
    try {
        const response = await axiosInstance.post(`/api/auth/email-verifylink/${token}`);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export default emailVerifylinkService;