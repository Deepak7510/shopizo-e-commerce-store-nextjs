import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import CategoryModel, { ICategory } from "@/models/Category.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditCategoryInput } from "@/types/admin.category.types"
import { editCatgeoryZodSchema } from "@/zodSchema/admin.category.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditCategoryInput;

        const checkValidation = editCatgeoryZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, name, slug, description } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid category id",);
        }

        const checkCategory = await CategoryModel.findOne<ICategory>({ slug, _id: { $ne: _id } });

        if (checkCategory) {
            throw new ApiError(403, "Already added");
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate<ICategory>(_id, { name, slug, description }, { new: true });

        if (!updatedCategory) {
            throw new ApiError(404, "Category not found");

        }

        return apiResponse(200, "Updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}