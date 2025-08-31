import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import MediaModel, { IMedia } from "@/models/Media.model";
import { UserRole } from "@/models/User.model";
import { TypeOfEditMedia } from "@/types/admin.media.types";
import { editMediaZodSchema } from "@/zodSchema/admin.media.schema";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(req, UserRole.ADMIN);
        const body = await req.json() as TypeOfEditMedia;

        const checkValidation = editMediaZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, title, alt } = checkValidation.data

        const media = await MediaModel.findByIdAndUpdate<IMedia>(_id, { title, alt }, { new: true });

        if (!media) {
            throw new ApiError(404, "Media not found.", { error: checkValidation.error });

        }

        return apiResponse(200, "Updated successfully.", { updatedMedia: media });

    } catch (error) {
        return errorHandler(error as Error)
    }
}