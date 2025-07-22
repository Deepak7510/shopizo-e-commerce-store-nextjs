import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler"
import { generateToken } from "@/lib/server/generateToken";
import { verifyOptValidationSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import User from "@/models/User.model";
import VerifyTokenModel from "@/models/Verifytoken.model";
import { NextRequest } from "next/server"


export const POST = async function (request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const checkValidation = verifyOptValidationSchema.safeParse(body);
        if (!checkValidation.success) {
            throw new ApiError(
                401,
                "Validation failed. Please check the input fields.",
                checkValidation.error.flatten().fieldErrors
            );
        }
        const { email, otp } = checkValidation.data;

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User not found!")
        }

        const existingOtp = await OTPModel.findOne({ email, otp });

        if (!existingOtp) {
            throw new ApiError(410, "Invalid or expired OTP.");
        }

        const token = await generateToken({ userId: String(user._id) }, "15m");

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        await VerifyTokenModel.create({ email, token, expiresAt });

        await OTPModel.deleteMany({ email });

        return apiResponse(200, "Account verified successfully.", { token });
    } catch (error: any) {
        return errorHandler(error)
    }

}