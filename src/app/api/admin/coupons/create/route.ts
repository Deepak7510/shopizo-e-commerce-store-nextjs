import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import CouponModel, { ICoupon } from "@/models/Coupon.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddCouponInput } from "@/types/admin.coupons.types";
import { addCouponZodSchema } from "@/zodSchema/admin.coupons.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddCouponInput;

        const checkValidation = addCouponZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { code } = checkValidation.data;

        const checkCouponExisting = await CouponModel.findOne({ code });

        if (checkCouponExisting) {
            throw new ApiError(400, "Coupon already exist");
        }

        await CouponModel.create<ICoupon>(checkValidation.data);

        return apiResponse(201, "Coupon added successfully");

    } catch (error) {
        return errorHandler(error);
    }
}