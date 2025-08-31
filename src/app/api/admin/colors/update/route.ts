import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ColorModel from "@/models/Color.model";
import { UserRole } from "@/models/User.model";
import { TypeOfEditColorInput } from "@/types/admin.colors.types";
import { editColorZodSchema } from "@/zodSchema/admin.color.schema";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const body = await request.json() as TypeOfEditColorInput;

        const checkvalidation = editColorZodSchema.safeParse(body);
        if (!checkvalidation.success) {
            throw new ApiError(401, "Invalid input or missing fields", { error: checkvalidation.error })
        }

        const { _id, name, hexCode, slug, description } = checkvalidation.data;
        const existingColor = await ColorModel.findOne({ hexCode, slug, _id: { $ne: _id } });

        if (existingColor) {
            throw new ApiError(401, "hexCode or name Already exist",)
        }

        const updatedColor = await ColorModel.findByIdAndUpdate(_id, { name, hexCode, slug, description }, { new: true });

        if (!updatedColor) {
            throw new ApiError(404, "Color not found");
        }

        return apiResponse(201, "Updated successfully")
    } catch (error) {
        return errorHandler(error)
    }
}