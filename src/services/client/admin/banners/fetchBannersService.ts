import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypeOfDeleteType } from "@/types/global.types";

export const fetchBannersService = async function (
  deleteType: TypeOfDeleteType
): Promise<TypeOfAxoisResponse> {
  try {
    const resposne = await axiosInstance.get(
      `/api/admin/banners?deleteType=${deleteType}`
    );
    return resposne.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
