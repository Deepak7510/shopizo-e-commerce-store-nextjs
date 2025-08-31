import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import CategoryModel from "@/models/Category.model";
import { UserRole } from "@/models/User.model";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";

export const GET = async function (req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        await connectDB();
        await verifyRole(req, UserRole.ADMIN);
        const id = (await params).id;

        if (!isValidObjectId(id)) {
            throw new ApiError(403, "Invalid data id");
        }

        const filter = { deletedAt: null }

        const category = await CategoryModel.findOne({ _id: id, ...filter });

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        return apiResponse(200, "Category fetched successfully", { category });

    } catch (error) {
        return errorHandler(error as Error)
    }

}