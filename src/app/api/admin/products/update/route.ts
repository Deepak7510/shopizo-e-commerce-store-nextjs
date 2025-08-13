import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import ProductModel, { IProduct } from "@/models/Product.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditBrandInput } from "@/types/admin.brands.types"
import { editProductZodSchema } from "@/zodSchema/admin.products.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditBrandInput;

        const checkValidation = editProductZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, slug } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data id",);
        }

        const checkProduct = await ProductModel.findOne<IProduct>({ slug, _id: { $ne: _id } });

        if (checkProduct) {
            throw new ApiError(403, "Product already exist");
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate<IProduct>(_id, checkValidation.data, { new: true });

        if (!updatedProduct) {
            throw new ApiError(404, "Product not found");
        }

        return apiResponse(200, "Product updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}