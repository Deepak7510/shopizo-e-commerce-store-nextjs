import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { mailEmailVerifylinkTamplate } from "@/lib/server/mailEmailVerifylinkTemplate";
import { errorHandler } from "@/lib/server/errorHandler";
import { generateToken } from "@/lib/server/generateToken";
import { sendMail } from "@/lib/server/sendMail";
import { emailValidationSchema } from "@/lib/zodSchema";
import User, { IUser } from "@/models/User.model";
import VerifyTokenModel from "@/models/Verifytoken.model";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/databaseConnection";

const MIN_RESEND_INTERVAL_MS = 60 * 1000; // 1 minute

export const POST = async (request: NextRequest) => {
    try {
        await connectDB();
        const body = await request.json();
        const validation = emailValidationSchema.safeParse(body);
        if (!validation.success) {
            throw new ApiError(401, "Validation failed. Please check input fields.", {
                errors: validation.error,
            });
        }

        const { email } = validation.data;

        const user = await User.findOne<IUser>({ email });

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        if (user.isEmailVerified) {
            throw new ApiError(400, "Email is already verified.");
        }

        const existingToken = await VerifyTokenModel.findOne({ email });

        if (existingToken) {
            const timeSinceLastSent =
                Date.now() - new Date(existingToken.createdAt).getTime();

            if (timeSinceLastSent < MIN_RESEND_INTERVAL_MS) {
                const wait = Math.ceil(
                    (MIN_RESEND_INTERVAL_MS - timeSinceLastSent) / 1000
                );
                throw new ApiError(
                    429,
                    `Please wait ${wait} seconds.`
                );
            }
            await VerifyTokenModel.deleteOne({ _id: existingToken._id });
        }

        const token = await generateToken({ userId: String(user._id) }, "10m");

        const emailSent = await sendMail(
            "Email Verification",
            email,
            mailEmailVerifylinkTamplate(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verifylink/${token}`
            )
        );

        if (!emailSent.success) {
            throw new ApiError(500, "Failed to send verification link.");
        }

        await VerifyTokenModel.create({ email, token });

        return apiResponse(200, "Verification link resent successfully.");
    } catch (error: any) {
        return errorHandler(error);
    }
};
