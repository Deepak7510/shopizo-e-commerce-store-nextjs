import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ColorModel from "@/models/Color.model";
import { UserRole } from "@/models/User.model";
import { TypeOfAddColorInput } from "@/types/admin.colors.types";
import { addColorZodSchema } from "@/zodSchema/admin.color.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfAddColorInput;

        const checkvalidation = addColorZodSchema.safeParse(body);
        if (!checkvalidation.success) {
            throw new ApiError(401, "Invalid input or missing fields", { error: checkvalidation.error })
        }

        const { hexCode, slug } = checkvalidation.data;
        const existingColor = await ColorModel.findOne({ hexCode, slug });

        if (existingColor) {
            throw new ApiError(401, "hexCode or name Already exist",)
        }

        const color = new ColorModel(checkvalidation.data);
        await color.save();
        return apiResponse(201, "Added successfully")
    } catch (error) {
        return errorHandler(error)
    }
}