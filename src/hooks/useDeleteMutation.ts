import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypeOfDeleteType } from "@/types/global.types";
import {
    useMutation,
    UseMutationResult,
} from "@tanstack/react-query";


export interface IDataForDelete {
    selectedIdList: string[];
    deleteType: TypeOfDeleteType;
}

export const useDeleteMutation = function (URL: string): UseMutationResult<TypeOfAxoisResponse, unknown, IDataForDelete> {

    const deleteHandler = async function (
        value: IDataForDelete,
    ): Promise<TypeOfAxoisResponse> {
        try {
            const response = await axiosInstance(URL, {
                method: value.deleteType === "PD" ? "DELETE" : "PUT",
                data: value,
            });
            return response.data;
        } catch (error: any) {
            console.error("API Error:", error);
            throw error.response?.data || error.message || "Unknown error";
        }
    };

    return useMutation({
        mutationFn: deleteHandler
    });
};
