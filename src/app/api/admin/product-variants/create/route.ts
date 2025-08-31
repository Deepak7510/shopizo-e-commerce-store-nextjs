import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductVariantModel from "@/models/Productvariant.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddProductVarinatInput } from "@/types/admin.productvariants.types";
import { addProductVarinatZodSchema } from "@/zodSchema/admin.productvariants.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddProductVarinatInput;
        const checkValidation = addProductVarinatZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { sku, productId, isDefault } = checkValidation.data;

        const checkProductVariantExisting = await ProductVariantModel.findOne({ sku });

        if (checkProductVariantExisting) {
            throw new ApiError(400, "Product sku already exist");
        }

        if (isDefault) {
            await ProductVariantModel.updateMany({ productId: productId }, { $set: { isDefault: false } });
        }

        await ProductVariantModel.create(checkValidation.data);

        return apiResponse(201, "Added successfully");
    } catch (error) {
        return errorHandler(error);
    }
}