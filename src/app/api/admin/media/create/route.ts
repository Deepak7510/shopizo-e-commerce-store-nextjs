import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole";
import MediaModel, { IMedia } from "@/models/Media.model";
import { UserRole } from "@/models/User.model";
import { TypedOfUploadMediaArray } from "@/types/admin.media.types";
import { uploadMediaArrayZodSchema } from "@/zodSchema/admin.media.schema";
import { NextRequest, NextResponse } from "next/server"

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        await verifyRole(request, UserRole.ADMIN);
        const body = await request.json() as TypedOfUploadMediaArray;

        const checkValidation = uploadMediaArrayZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid file data", { error: checkValidation.error });
        }
        const newMedia = await MediaModel.insertMany(checkValidation.data);

        return apiResponse(200, "Media upload successfully.", { newMedia });

    } catch (error) {
        return errorHandler(error)
    }
}