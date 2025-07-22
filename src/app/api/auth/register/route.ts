import { connectDB } from "@/lib/server/databaseConnection";
import { sendMail } from "@/lib/server/sendMail";
import { registerValidateSchema } from "@/lib/zodSchema";
import User, { IUser } from "@/models/User.model";
import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { errorHandler } from "@/lib/server/errorHandler";
import { NextRequest } from "next/server";
import { generateToken } from "@/lib/server/generateToken";
import VerifyTokenModel from "@/models/Verifytoken.model";
import { mailEmailVerifylinkTamplate } from "@/lib/server/mailEmailVerifylinkTemplate";

export const POST = async function (req: NextRequest) {
    try {
        await connectDB();
        const data = (await req.json()) as Partial<IUser>;
        const validateData = registerValidateSchema.safeParse(data);
        if (!validateData.success) {
            throw new ApiError(401, "Validation failed. Please check input fields.", {
                errors: validateData.error,
            });
        }

        const { name, email, password } = validateData.data;

        const checkUser = await User.exists({ email });
        if (checkUser) {
            throw new ApiError(409, "Email already registered.");
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = await generateToken({ userId: String(newUser._id) }, "10m");

        const result = await sendMail(
            "Email Verification",
            email,
            mailEmailVerifylinkTamplate(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verifylink/${token}`
            )
        );

        if (!result.success) {
            throw apiResponse(400, "Registration failed.")
        }

        await VerifyTokenModel.create({ email, token });
        return apiResponse(201, "Registration successful.");
    } catch (error) {
        return errorHandler(error as Error);
    }
};
