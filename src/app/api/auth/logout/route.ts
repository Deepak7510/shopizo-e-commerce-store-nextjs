import apiResponse from "@/lib/server/apiResponse";
import { errorHandler } from "@/lib/server/errorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        const cokkies = await cookies();
        cokkies.delete("accessToken");
        return apiResponse(200, "Logged out successfully");
    } catch (error) {
        return errorHandler(error)
    }
}