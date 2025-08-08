import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import SubcategoryModel, { ISubcategory } from "@/models/Subcategory.model";
import { UserRole } from "@/models/User.model";
import { addSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json();

        const checkValidation = addSubcategoryZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input fields data", { error: checkValidation.error });
        }

        const { name, slug, category } = checkValidation.data;

        const checkSubcategoryExisting = await SubcategoryModel.findOne({ slug });

        if (checkSubcategoryExisting) {
            throw new ApiError(400, "Subcategory already exist");
        }

        await SubcategoryModel.create<ISubcategory>({ name, slug, category });

        return apiResponse(201, "Subcategory added successfully");

    } catch (error) {
        return errorHandler(error)

    }
}