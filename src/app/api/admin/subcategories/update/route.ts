import { ApiError } from "@/lib/server/apiError"
import apiResponse from "@/lib/server/apiResponse"
import { connectDB } from "@/lib/server/databaseConnection"
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole"
import SubcategoryModel, { ISubcategory } from "@/models/Subcategory.model"
import { UserRole } from "@/models/User.model"
import { TypeOfEditSubcategoryInput } from "@/types/admin.subcategories.types"
import { editSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema"
import { isValidObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditSubcategoryInput;

        const checkValidation = editSubcategoryZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { _id, name, slug, category } = checkValidation.data;

        if (!isValidObjectId(_id)) {
            throw new ApiError(400, "Invalid data Id",);
        }

        const checkCategory = await SubcategoryModel.findOne<ISubcategory>({ slug, _id: { $ne: _id } });

        if (checkCategory) {
            throw new ApiError(403, "Subcategory already added");
        }

        const updatedCategory = await SubcategoryModel.findByIdAndUpdate<ISubcategory>(_id, { name, slug, category }, { new: true });

        if (!updatedCategory) {
            throw new ApiError(404, "Subcategory not found");

        }

        return apiResponse(200, "Subcategory updated successfully");
    } catch (error) {
        return errorHandler(error)

    }
}