import axiosInstance from "@/lib/axios"

export const checkAuthService = async function (): Promise<any> {
    try {
        const stored = sessionStorage.getItem("accessToken");
        const accessToken = stored ? JSON.parse(stored) : null
        const response = await axiosInstance.get('/api/auth/check-auth', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}