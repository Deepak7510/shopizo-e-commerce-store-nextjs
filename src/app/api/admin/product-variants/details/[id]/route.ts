import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductVariantModel from "@/models/Productvariant.model";
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

        const productVariantDetails = await ProductVariantModel.findById(id).populate({
            path: "productId",
            select: "name"
        });

        if (!productVariantDetails) {
            throw new ApiError(404, "Product Variant not found");
        }

        return apiResponse(200, "Product Variant details fetched successfully", { productVariantDetails })
    } catch (error) {
        return errorHandler(error);
    }

}