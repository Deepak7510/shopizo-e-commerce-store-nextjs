import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";

export const checkAuthService =
  async function (): Promise<TypeOfAxoisResponse> {
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");
      return response.data;
    } catch (error: any) {
      console.error("Error from API:", error);
      return error?.response?.data;
    }
  };
