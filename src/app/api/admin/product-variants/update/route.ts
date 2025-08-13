import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import ProductModel, { IProduct } from "@/models/Product.model"
import ProductVariantModel from "@/models/Productvariant.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditProductVarinatInput } from "@/types/admin.productvariants.types"
import { editProductVarinatZodSchema } from "@/zodSchema/admin.productvariants.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditProductVarinatInput;

        const checkValidation = editProductVarinatZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, sku } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data id",);
        }

        const checkProduct = await ProductVariantModel.findOne({ sku, _id: { $ne: _id } });

        if (checkProduct) {
            throw new ApiError(403, "sku already exist");
        }

        const updatedProductVariant = await ProductVariantModel.findByIdAndUpdate(_id, checkValidation.data, { new: true });

        if (!updatedProductVariant) {
            throw new ApiError(404, "Product Variant not found");
        }

        return apiResponse(200, "Product Variant updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}