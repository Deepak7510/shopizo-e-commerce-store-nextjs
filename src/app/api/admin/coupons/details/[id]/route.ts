import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import CouponModel from "@/models/Coupon.model";
import { UserRole } from "@/models/User.model";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const id = (await params).id;

        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid data id");
        }

        const coupon = await CouponModel.findById(id)

        if (!coupon) {
            throw new ApiError(404, "Coupon not found");
        }

        return apiResponse(200, "Coupon fetched successfully", { coupon })
    } catch (error) {
        return errorHandler(error);
    }

}