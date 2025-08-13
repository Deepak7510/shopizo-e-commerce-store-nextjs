import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler"
import { verifyRole } from "@/lib/server/verifyRole";
import CategoryModel, { ICategory } from "@/models/Category.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddCategoryInput } from "@/types/admin.category.types"
import { addCategoryZodSchema } from "@/zodSchema/admin.category.schema";
import { NextRequest, NextResponse } from "next/server"


export const POST = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(req, UserRole.ADMIN);

        const body = await req.json() as TypeOfAddCategoryInput;

        const checkValidation = addCategoryZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { name, slug } = checkValidation.data;

        const existingCategory = await CategoryModel.exists({ slug: slug });

        if (existingCategory) {
            throw new ApiError(403, "Category already exist");
        }

        await CategoryModel.create<ICategory>({ name, slug });

        return apiResponse(200, "Category added successfully");
    } catch (error) {
        return errorHandler(error)
    }
}