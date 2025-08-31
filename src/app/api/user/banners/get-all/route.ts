import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import BannerModel from "@/models/Banner.model";
import MediaModel from "@/models/Media.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get("type") || 'normal';

        const banners = await BannerModel.find({
            deletedAt: null,
            type,
            endDate: { $gte: new Date() }
        }).populate({
            path: "bannerImage",
            model: MediaModel,
        });

        return apiResponse(200, "Banners fetched successfully", { banners });
    } catch (error) {
        return errorHandler(error);
    }
}
