import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import CategoryModel from "@/models/Category.model";
import { NextResponse } from "next/server";

export const GET = async function (): Promise<NextResponse> {
    try {
        await connectDB();
        const allDataList = await CategoryModel.find({ deletedAt: null });
        return apiResponse(200, "User categories fetched successfully", { allDataList })
    } catch (error) {
        return errorHandler(error)
    }
}