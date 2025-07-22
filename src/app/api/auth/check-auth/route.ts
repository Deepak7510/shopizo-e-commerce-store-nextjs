// Server-only code here
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import apiResponse from "@/lib/server/apiResponse";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyToken } from "@/lib/server/verifyToken";
import User from "@/models/User.model";
import { ApiError } from "@/lib/server/apiError";

export const GET = async (request: NextRequest) => {
    try {
        const cookieStore = await cookies();
        const accessTokenByCookie = cookieStore.get("accessToken")?.value;
        const accessTokenByHeaders = await request.headers.get("authorization")?.split(" ")[1];

        const accessToken = accessTokenByCookie || accessTokenByHeaders;

        if (!accessToken) {
            throw new ApiError(401, "Access token missing or unauthorized");
        }

        const { userId } = await verifyToken(accessToken);

        if (!userId) {
            throw new ApiError(403, "Invalid or expired token");
        }

        const userInfo = await User.findById(userId).select("name email role avatar");

        if (!userInfo) {
            throw new ApiError(404, "User not found");
        }

        return apiResponse(200, "User authenticated successfully", { userInfo });

    } catch (error) {
        return errorHandler(error);
    }
};
