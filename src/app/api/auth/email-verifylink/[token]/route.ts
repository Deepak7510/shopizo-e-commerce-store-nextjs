import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { generateToken } from "@/lib/server/generateToken";
import { verifyToken } from "@/lib/server/verifyToken";
import User, { IUser } from "@/models/User.model";
import VerifyTokenModel, { IVerifyToken } from "@/models/Verifytoken.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (
    _: NextRequest,
    { params }: { params: Promise<{ token: string }> }
): Promise<NextResponse> {
    try {
        await connectDB();
        const token = (await params).token;

        if (!token) {
            throw new ApiError(400, "token not found");
        }

        const { userId } = await verifyToken(token);

        if (!userId) {
            throw new ApiError(401, "Invalid or expired token");
        }

        const user = await User.findById<IUser>(userId).select("name email role isEmailVerified");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.isEmailVerified) {
            throw new ApiError(409, "Email already verified");
        }

        const checkToken = await VerifyTokenModel.findOne<IVerifyToken>({ email: user.email, token });

        if (!checkToken) {
            throw new ApiError(410, "Invalid or expired token");
        }

        user.isEmailVerified = true;
        await user.save();

        await VerifyTokenModel.deleteMany({ email: (user.email) });

        const accessToken = await generateToken({ userId: String(user._id) }, "7d");

        const response = apiResponse(200, "Email verified successfully.", {
            accessToken,
            userInfo: {
                userId: String(user._id),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
