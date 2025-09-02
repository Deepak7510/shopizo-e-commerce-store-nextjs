import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BannerModel, { BannerType } from "@/models/Banner.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddBannerInput } from "@/types/admin.banners.types";
import { addBannerZodSchema } from "@/zodSchema/admin.banner.schema";
import { NextRequest, NextResponse } from "next/server";


const BANNER_LIMITS: any = {
    hero: 1,
    slider: 5,
    promo: 10,
    bigpromo: 2,
    sidebar: 3,
    popup: 2
};



export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddBannerInput;

        const checkValidation = addBannerZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { type } = checkValidation.data;

        const validTypes = Object.values(BannerType).map(t => t.toLowerCase());
        if (!validTypes.includes(type.toLowerCase())) {
            throw new ApiError(400, "Invalid banner type");
        }

        const count = await BannerModel.countDocuments({ type });

        if (count >= BANNER_LIMITS[type]) {
            throw new ApiError(401, `Max ${BANNER_LIMITS[type]} banners allowed for type ${type}`
            );
        }

        const newBanner = new BannerModel(checkValidation.data);
        await newBanner.save()

        return apiResponse(201, "Added successfully", { newBanner });

    } catch (error) {
        return errorHandler(error);
    }
}