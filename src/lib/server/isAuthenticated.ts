import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "./apiError";
import { verifyToken } from "./verifyToken";


export const isAuthenticated = async function (request: NextRequest): Promise<any> {
    const cookieStore = await cookies();
    const accessTokenByCookie = cookieStore.get("accessToken")?.value;
    const accessTokenByHeaders = request.headers.get("authorization")?.split(" ")[1];

    const accessToken = accessTokenByCookie || accessTokenByHeaders;


    if (!accessToken) {
        throw new ApiError(401, "Access token missing or unauthorized");
    }

    const payload = await verifyToken(accessToken);

    if (!payload.userId) {
        throw new ApiError(403, "Invalid or expired token");
    }

    return payload
}