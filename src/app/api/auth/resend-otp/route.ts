import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import generateOTP from "@/lib/server/generateOTP";
import { mailOtpVerifyTemplate } from "@/lib/server/mailOtpVerifyTemplate";
import { sendMail } from "@/lib/server/sendMail";
import OTPModel, { IOtp } from "@/models/Otp.model";
import User, { IUser } from "@/models/User.model";
import { TypesOfEmailInput } from "@/types/auth.types";
import { emailZodSchema } from "@/zodSchema/auth.schema";
import { NextRequest, NextResponse } from "next/server";

const MIN_RESEND_INTERVAL_MS = 60 * 1000;

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const body = await request.json() as TypesOfEmailInput;

        const checkValidation = emailZodSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(
                401,
                "Validation failed. Please check the provided information..",
                checkValidation.error
            );
        }

        const { email } = checkValidation.data;

        const user = await User.findOne<IUser>({ email });
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const existingOTP = await OTPModel.findOne<IOtp>({ email });
        if (existingOTP) {
            const timeSinceLastSent =
                Date.now() - new Date(existingOTP.createdAt).getTime();

            if (timeSinceLastSent < MIN_RESEND_INTERVAL_MS) {
                const wait = Math.ceil(
                    (MIN_RESEND_INTERVAL_MS - timeSinceLastSent) / 1000
                );
                throw new ApiError(429, `Wait ${wait}s before request.`);
            }

            await OTPModel.deleteMany({ email });
        }

        const newOtp = generateOTP();
        const result = await sendMail(
            "OTP Verification",
            email,
            mailOtpVerifyTemplate(newOtp)
        );

        if (!result.success) {
            throw new ApiError(500, "Email send failed.");
        }

        await OTPModel.create<IOtp>({ email, otp: newOtp });

        return apiResponse(200, "OTP sent successfully.");
    } catch (error) {
        return errorHandler(error);
    }
};
