import { IDataForDelete } from "@/hooks/useDeleteMutation";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductVariantModel from "@/models/Productvariant.model";
import { UserRole } from "@/models/User.model";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const body = await request.json() as IDataForDelete;

        const { deleteType, selectedIdList } = body

        if (!["SD", "RSD"].includes(deleteType)) {
            throw new ApiError(401, "Invalid delete type.");
        }

        if (deleteType === "SD") {
            await ProductVariantModel.updateMany({ _id: { $in: selectedIdList } }, { $set: { deletedAt: new Date().toISOString() } });
        } else {
            await ProductVariantModel.updateMany({ _id: { $in: selectedIdList } }, { $set: { deletedAt: null } });
        }

        const message = deleteType === "SD"
            ? "Product Variant moved to trash successfully."
            : "Product Variant restored successfully.";
        return apiResponse(200, message)

    } catch (error) {
        return errorHandler(error)

    }
}

export const DELETE = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const body = await request.json() as IDataForDelete;

        const { deleteType, selectedIdList } = body

        if (deleteType !== "PD") {
            throw new ApiError(401, "Invalid delete type.");
        }

        await ProductVariantModel.deleteMany({ _id: { $in: selectedIdList } });

        return apiResponse(200, "Product Variant deleted successfully.")

    } catch (error) {
        return errorHandler(error)

    }
}