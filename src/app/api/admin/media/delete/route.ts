import { IDataForDelete } from "@/hooks/useDeleteMutation";
import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import cloudinary from "@/lib/server/cloudinaryConfig";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import MediaModel, { IMedia } from "@/models/Media.model";
import { UserRole } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        await verifyRole(req, UserRole.ADMIN);
        const body = await req.json() as IDataForDelete
        const { selectedIdList, deleteType } = body

        if (!["SD", "RSD"].includes(deleteType)) {
            throw new ApiError(401, "Invalid delete type.");
        }

        if (deleteType === "SD") {
            await MediaModel.updateMany<IMedia>({ _id: { $in: selectedIdList } }, { $set: { deletedAt: new Date().toISOString() } });
        } else {
            await MediaModel.updateMany<IMedia>({ _id: { $in: selectedIdList } }, { $set: { deletedAt: null } });
        }

        const message = deleteType === "SD"
            ? "Media moved to trash successfully."
            : "Media restored successfully.";

        return apiResponse(200, message);

    } catch (error) {
        return errorHandler(error)
    }
}

export const DELETE = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        await verifyRole(req, UserRole.ADMIN);
        const body = await req.json() as IDataForDelete
        const { selectedIdList, deleteType } = body

        if (deleteType !== "PD") {
            throw new ApiError(401, "Invalid delete type.");
        }
        const mediaList = await MediaModel.find<IMedia>({ _id: { $in: selectedIdList } });

        if (!mediaList.length) {
            throw new ApiError(404, "No media found for deletion.");
        }

        const mediaPublicIdList = mediaList.map(media => media.public_id);

        const cloudRes = await cloudinary.api.delete_resources(mediaPublicIdList);

        if (!cloudRes || !cloudRes.deleted || Object.keys(cloudRes.deleted).length === 0) {
            throw new ApiError(500, "Cloudinary deletion failed.");
        }

        await MediaModel.deleteMany({ _id: { $in: selectedIdList } });

        return apiResponse(200, "Media deeleted successfully.");

    } catch (error) {
        return errorHandler(error)
    }
}