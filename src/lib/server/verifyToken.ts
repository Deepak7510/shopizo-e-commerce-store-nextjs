import { jwtVerify } from "jose";
import { ApiError } from "./apiError";

export const verifyToken = async function (token: string): Promise<any> {
    try {
        const secret = new TextEncoder().encode(process.env.JOSE_SECRET_KEY);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired.");
        } else {
            throw new ApiError(401, "Invalid token.");
        }
    }
}