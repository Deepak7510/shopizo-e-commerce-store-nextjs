import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import CategoryModel, { ICategory } from "@/models/Category.model"
import { UserRole } from "@/models/User.model"
import { TypesOfEditCategoryInput } from "@/types/admin.category.types"
import { editCatgeoryZodSchema } from "@/zodSchema/admin.category.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypesOfEditCategoryInput;

        const checkValidation = editCatgeoryZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid Category data", { error: checkValidation.error });
        }

        const { _id, name, slug } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid Category Id data",);
        }

        const checkCategory = await CategoryModel.findOne<ICategory>({ slug, _id: { $ne: _id } });

        if (checkCategory) {
            throw new ApiError(403, "Category already added.");
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate<ICategory>(_id, { name, slug }, { new: true });

        if (!updatedCategory) {
            throw new ApiError(404, "Category not found.");

        }

        return apiResponse(200, "Category Updated Successfully.");
    } catch (error) {
        return errorHandler(error)

    }
}