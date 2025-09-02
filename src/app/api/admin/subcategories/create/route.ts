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
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { slug, category } = checkValidation.data;

        const checkSubcategoryExisting = await SubcategoryModel.findOne({ $and: [{ slug }, { category }] });

        if (checkSubcategoryExisting) {
            throw new ApiError(400, "Already exist");
        }

        await SubcategoryModel.create<ISubcategory>(checkValidation.data);

        return apiResponse(201, "Added successfully");

    } catch (error) {
        return errorHandler(error)

    }
}