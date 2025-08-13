import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { generateToken } from "@/lib/server/generateToken";
import OTPModel, { IOtp } from "@/models/Otp.model";
import User, { IUser } from "@/models/User.model";
import { verifyOtpZodSchema } from "@/zodSchema/auth.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const body = await request.json();

        const checkValidation = verifyOtpZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", {
                errors: checkValidation.error,
            });
        }

        const { email, otp } = checkValidation.data;

        const user = await User.findOne<IUser>({ email }).select("name email role");
        if (!user) {
            throw new ApiError(404, "User is not found.");
        }


        const existingOtp = await OTPModel.findOne<IOtp>({ email, otp });
        if (!existingOtp) {
            throw new ApiError(429, "Invalid or expired OTP.");
        }

        await OTPModel.deleteMany({ email });

        const accessToken = await generateToken({
            userId: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
        }, '7d');

        const response = apiResponse(200, "Login successfully", {
            userInfo: {
                userId: String(user._id),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken
        });

        response.cookies.set("accessToken", accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 60 * 60 * 1000
        });

        return response;

    } catch (error) {
        return errorHandler(error);
    }
};
