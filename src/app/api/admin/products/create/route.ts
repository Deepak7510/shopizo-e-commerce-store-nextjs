import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductModel, { IProduct } from "@/models/Product.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddProductInput } from "@/types/admin.products.types";
import { addProductZodSchema } from "@/zodSchema/admin.products.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddProductInput;

        const checkValidation = addProductZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { slug } = checkValidation.data;

        const checkProductExisting = await ProductModel.findOne({ slug });

        if (checkProductExisting) {
            throw new ApiError(400, "Already exist");
        }

        await ProductModel.create<IProduct>(checkValidation.data);

        return apiResponse(201, "Added successfully");
    } catch (error) {
        return errorHandler(error);
    }
}