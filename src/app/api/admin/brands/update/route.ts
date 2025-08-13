import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import BrandModel, { IBrand } from "@/models/Brand.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditBrandInput } from "@/types/admin.brands.types"
import { editBrandZodSchema } from "@/zodSchema/admin.brands.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditBrandInput;

        const checkValidation = editBrandZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, name, slug } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data id",);
        }

        const checkBrand = await BrandModel.findOne<IBrand>({ slug, _id: { $ne: _id } });

        if (checkBrand) {
            throw new ApiError(403, "Brand already exist");
        }

        const updatedBrand = await BrandModel.findByIdAndUpdate<IBrand>(_id, { name, slug }, { new: true });

        if (!updatedBrand) {
            throw new ApiError(404, "Brand not found");
        }

        return apiResponse(200, "Brand updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}