import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BrandModel from "@/models/Brand.model";
import { UserRole } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const brands = await BrandModel.find({ deletedAt: null }).sort({ _id: -1 });
        return apiResponse(200, "Brands fetched successfully", { brands });

    } catch (error) {
        return errorHandler(error);

    }
}