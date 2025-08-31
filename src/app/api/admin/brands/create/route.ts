import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BrandModel, { IBrand } from "@/models/Brand.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddBrandInput } from "@/types/admin.brands.types";
import { addBrandZodSchema } from "@/zodSchema/admin.brands.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddBrandInput;

        const checkValidation = addBrandZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", { error: checkValidation.error });
        }

        const { slug } = checkValidation.data

        const checkBrandExisting = await BrandModel.findOne<IBrand>({ slug });

        if (checkBrandExisting) {
            throw new ApiError(401, "Already exist")
        }

        await BrandModel.create<IBrand>(checkValidation.data);

        return apiResponse(201, "Added Successfully")
    } catch (error) {
        return errorHandler(error)
    }
}