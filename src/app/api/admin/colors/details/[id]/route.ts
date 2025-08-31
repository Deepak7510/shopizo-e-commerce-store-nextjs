import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ColorModel from "@/models/Color.model";
import { UserRole } from "@/models/User.model";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const { id } = await params;
        if (!isValidObjectId(id)) {
            throw new ApiError(401, "Invalid color id")
        }
        const color = await ColorModel.findById(id);
        return apiResponse(200, "Color fetched successfully", { color });
    } catch (error) {
        return errorHandler(error)
    }
}