import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { mailEmailVerifylinkTamplate } from "@/lib/server/mailEmailVerifylinkTemplate";
import { errorHandler } from "@/lib/server/errorHandler";
import generateOTP from "@/lib/server/generateOTP";
import { generateToken } from "@/lib/server/generateToken";
import { mailOtpVerifyTemplate } from "@/lib/server/mailOtpVerifyTemplate";
import { sendMail } from "@/lib/server/sendMail";
import OTPModel, { IOtp } from "@/models/Otp.model";
import User, { IUser } from "@/models/User.model";
import VerifyTokenModel, { IVerifyToken } from "@/models/Verifytoken.model";
import { NextRequest, NextResponse } from "next/server";
import { loginZodSchema } from "@/zodSchema/auth.schema";
import { TypeOfLoginInput } from "@/types/auth.types";

export const POST = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const data = (await req.json()) as TypeOfLoginInput;

        const checkValidation = loginZodSchema.safeParse(data);
        if (!checkValidation.success) {
            throw new ApiError(
                401,
                "Invalid input or missing fields",
                checkValidation.error.flatten().fieldErrors
            );
        }

        const { email, password } = data;

        const user = await User.findOne<IUser>({ email });
        if (!user) {
            throw new ApiError(409, "Invalid email or password credentials.");
        }

        const checkPassword = await user.comparePassword(password!);
        if (!checkPassword) {
            throw new ApiError(409, "Invalid email or password credentials.");
        }

        if (!user.isEmailVerified) {
            const token = await generateToken({ userId: String(user._id) }, "10m");
            await sendMail(
                "Email Verification Link",
                email!,
                mailEmailVerifylinkTamplate(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verifylink/${token}`
                )
            );

            await VerifyTokenModel.create<IVerifyToken>({ email, token });
            return apiResponse(
                200,
                "Email is not verified. A verification link has been sent.",
                null,
                "EMAIL_VERIFICATION"
            );
        }

        const OTP = generateOTP()
        const result = await sendMail("OTP Verification", email!, mailOtpVerifyTemplate(OTP));

        if (!result.success) {
            throw new ApiError(500, "Failed to send OTP.");
        }
        await OTPModel.deleteMany({ email });
        await OTPModel.create({ email, otp: OTP });
        return apiResponse(200, "OTP has been sent successfully.", null, "OTP_VERIFICATION")

    } catch (error) {
        return errorHandler(error);
    }
};
