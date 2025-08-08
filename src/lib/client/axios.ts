import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const stored = sessionStorage.getItem("access_token");
        if (stored) {
            const accessToken = JSON.parse(stored);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
