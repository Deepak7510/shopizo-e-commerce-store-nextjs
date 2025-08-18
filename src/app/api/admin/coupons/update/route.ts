import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import CouponModel, { ICoupon } from "@/models/Coupon.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditCouponInput } from "@/types/admin.coupons.types"
import { editCouponZodSchema } from "@/zodSchema/admin.coupons.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditCouponInput;

        const checkValidation = editCouponZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, code } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data id",);
        }

        const checkCoupon = await CouponModel.findOne<ICoupon>({ code, _id: { $ne: _id } });

        if (checkCoupon) {
            throw new ApiError(403, "Coupon already exist");
        }

        const updatedCoupon = await CouponModel.findByIdAndUpdate<ICoupon>(_id, checkValidation.data, { new: true });

        if (!updatedCoupon) {
            throw new ApiError(404, "Coupon not found");
        }

        return apiResponse(200, "Coupon updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}