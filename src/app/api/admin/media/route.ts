import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import MediaModel, { IMedia } from "@/models/Media.model";
import { UserRole } from "@/models/User.model";
import { NextRequest } from "next/server";

export const GET = async function (request: NextRequest) {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const searchParams = request.nextUrl.searchParams;

        const page = parseInt(searchParams.get("page")!, 10) || 0;
        const limit = parseInt(searchParams.get("limit")!, 10) || 10;
        const deleteType = searchParams.get("deleteType");

        let filter = {};

        if (deleteType === "SD") {
            filter = { deletedAt: null }
        } else if (deleteType === "PD") {
            filter = { deletedAt: { $ne: null } }
        }

        const mediaList = await MediaModel
            .find<IMedia>(filter)
            .sort({ _id: -1 })
            .skip(page * limit)
            .limit(limit)
            .lean();
        const totalMedia = await MediaModel.countDocuments(filter);
        return apiResponse(200, "Media fetched successfully", { mediaList, hasMore: ((page + 1) * limit < totalMedia) });

    } catch (error) {
        return errorHandler(error)

    }

}