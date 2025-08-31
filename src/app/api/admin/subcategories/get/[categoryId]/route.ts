import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import SubcategoryModel from "@/models/Subcategory.model";
import { UserRole } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const { categoryId } = await params
        const subcategories = await SubcategoryModel.find({ deletedAt: null, category: categoryId }).sort({ createdAt: -1 });
        return apiResponse(200, "Subcategories fetched successfully", { subcategories });
    } catch (error) {
        return errorHandler(error)

    }
}