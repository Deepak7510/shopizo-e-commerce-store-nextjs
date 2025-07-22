import { jwtVerify } from "jose";
import { ApiError } from "./apiError";

export const verifyToken = async function (token: string): Promise<any> {
    try {
        const secret = new TextEncoder().encode(process.env.JOSE_SECRET_KEY);
        const decode = await jwtVerify(token, secret);
        return decode.payload;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired. Please login again.");
        } else {
            throw new ApiError(401, "Invalid token.");
        }
    }
}