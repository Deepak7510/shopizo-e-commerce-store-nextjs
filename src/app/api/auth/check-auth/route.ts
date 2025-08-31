import { NextRequest, NextResponse } from "next/server";
import apiResponse from "@/lib/server/apiResponse";
import { errorHandler } from "@/lib/server/errorHandler";
import User, { IUser } from "@/models/User.model";
import { ApiError } from "@/lib/server/apiError";
import { connectDB } from "@/lib/server/databaseConnection";
import { isAuthenticated } from "@/lib/server/isAuthenticated";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const { userId } = await isAuthenticated(request);

        const userInfo = await User.findById<IUser>(userId).select("name email role avatar");

        if (!userInfo) {
            throw new ApiError(404, "User not found");
        }

        return apiResponse(200, "User authenticated successfully", { userInfo });

    } catch (error) {
        return errorHandler(error);
    }
};
