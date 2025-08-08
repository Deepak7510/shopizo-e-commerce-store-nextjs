import { UserRole } from "@/models/User.model";
import { NextRequest } from "next/server";
import { connectDB } from "./databaseConnection";
import { isAuthenticated } from "./isAuthenticated";
import { ApiError } from "./apiError";

export const verifyRole = async function (request: NextRequest, role: UserRole) {
    await connectDB();
    const payload = await isAuthenticated(request);
    if (payload.role !== role) {
        throw new ApiError(401, "Unauthroized user.")
    }
    return payload;
}