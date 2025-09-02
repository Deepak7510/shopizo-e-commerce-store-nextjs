import { connectDB } from "@/lib/server/databaseConnection";
import { sendMail } from "@/lib/server/sendMail";
import User from "@/models/User.model";
import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { errorHandler } from "@/lib/server/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/server/generateToken";
import VerifyTokenModel, { IVerifyToken } from "@/models/Verifytoken.model";
import { mailEmailVerifylinkTamplate } from "@/lib/server/mailEmailVerifylinkTemplate";
import { TypeOfRegisterInput } from "@/types/auth.types";
import { registerZodSchema } from "@/zodSchema/auth.schema";

export const POST = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const data = (await req.json()) as TypeOfRegisterInput;

        const validateData = registerZodSchema.safeParse(data);
        if (!validateData.success) {
            throw new ApiError(401, "Invalid input or missing fields", {
                errors: validateData.error,
            });
        }

        const { name, email, password } = validateData.data;

        const checkUser = await User.exists({ email });
        if (checkUser) {
            throw new ApiError(409, "Email already registered");
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = await generateToken({ userId: String(newUser._id) }, "10m");

        const result = await sendMail(
            "Email Verification Link",
            email,
            mailEmailVerifylinkTamplate(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verifylink/${token}`
            )
        );

        if (!result.success) {
            throw apiResponse(400, "Registration failed");
        }

        await VerifyTokenModel.create<IVerifyToken>({ email, token });
        return apiResponse(201, "Registration successful", null, "EMAIL_VERIFICATION");
    } catch (error) {
        return errorHandler(error as Error);
    }
};
