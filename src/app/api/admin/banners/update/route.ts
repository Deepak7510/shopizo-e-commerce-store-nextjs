import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import BannerModel, { IBanner } from "@/models/Banner.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditBannerInput } from "@/types/admin.banners.types"
import { editBannerZodSchema } from "@/zodSchema/admin.banner.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditBannerInput;

        const checkValidation = editBannerZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data id",);
        }

        const updatedBanner = await BannerModel.findByIdAndUpdate<IBanner>(_id, checkValidation.data, { new: true });

        if (!updatedBanner) {
            throw new ApiError(404, "Banner not found");
        }

        return apiResponse(200, "Updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}