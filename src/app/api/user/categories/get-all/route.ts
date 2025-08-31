import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import CategoryModel from "@/models/Category.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (requset: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const allDataList = await CategoryModel.find({ deletedAt: null });
        return apiResponse(200, "User categories fetched successfully", { allDataList })
    } catch (error) {
        return errorHandler(error)
    }
}