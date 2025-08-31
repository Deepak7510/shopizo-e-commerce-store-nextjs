import { jwtVerify } from "jose";
import { ApiError } from "./apiError";

export type typeOfVerifyTokenResult = {
    userId: string;
    name?: string;
    email?: string;
    role?: string;
    iat?: string;
    exp?: string
}

export const verifyToken = async function (token: string): Promise<typeOfVerifyTokenResult> {
    try {
        const secret = new TextEncoder().encode(process.env.JOSE_SECRET_KEY);
        const { payload } = await jwtVerify(token, secret);
        return payload as typeOfVerifyTokenResult;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired");
        } else {
            throw new ApiError(401, "Invalid token");
        }
    }
}