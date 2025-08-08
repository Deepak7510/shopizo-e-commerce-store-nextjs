import axiosInstance from "@/lib/client/axios";
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";
import { TypesOfDeleteType } from "@/types/global.types";
import {
    useMutation,
    UseMutationResult,
} from "@tanstack/react-query";


export interface IDataForDelete {
    selectedIdList: string[];
    deleteType: TypesOfDeleteType;
}

export const useDeleteMutation = function (URL: string): UseMutationResult<TypesOfAxoisResponse, unknown, IDataForDelete> {

    const deleteHandler = async function (
        value: IDataForDelete,
    ): Promise<TypesOfAxoisResponse> {
        try {
            const response = await axiosInstance(URL, {
                method: value.deleteType === "PD" ? "DELETE" : "PUT",
                data: value,
            });
            return response.data;
        } catch (error: any) {
            console.log("API Error:", error);
            throw error.response?.data || error.message || "Unknown error";
        }
    };

    return useMutation({
        mutationFn: deleteHandler
    });
};
