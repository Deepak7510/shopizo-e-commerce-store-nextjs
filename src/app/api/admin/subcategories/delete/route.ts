import { IDataForDelete } from "@/hooks/useDeleteMutation";
import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import SubcategoryModel, { ISubcategory } from "@/models/Subcategory.model";
import { UserRole } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(req, UserRole.ADMIN);

        const body = (await req.json()) as IDataForDelete;

        const { selectedIdList, deleteType } = body;

        if (!["SD", "RSD"].includes(deleteType)) {
            throw new ApiError(401, "Invalid delete type");
        }

        if (deleteType === "SD") {
            await SubcategoryModel.updateMany<ISubcategory>(
                { _id: { $in: selectedIdList } },
                { $set: { deletedAt: new Date().toISOString() } }
            );
        } else {
            await SubcategoryModel.updateMany<ISubcategory>(
                { _id: { $in: selectedIdList } },
                { $set: { deletedAt: null } }
            );
        }

        const message =
            deleteType === "SD"
                ? "Moved to trash"
                : "Restored successfully";

        return apiResponse(200, message);
    } catch (error) {
        return errorHandler(error);
    }
};

export const DELETE = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        await verifyRole(req, UserRole.ADMIN);
        const body = (await req.json()) as IDataForDelete;

        const { selectedIdList, deleteType } = body;

        if (deleteType !== "PD") {
            throw new ApiError(401, "Invalid delete type");
        }

        await SubcategoryModel.deleteMany({ _id: { $in: selectedIdList } });

        return apiResponse(200, "Deleted successfully");
    } catch (error) {
        return errorHandler(error);
    }
};
