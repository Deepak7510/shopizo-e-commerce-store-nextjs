import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyToken } from "@/lib/server/verifyToken";
import User, { IUser } from "@/models/User.model";
import VerifyTokenModel from "@/models/Verifytoken.model";
import { TypeOfResetPasswordInput } from "@/types/auth.types";
import { resetPasswordZodSchema } from "@/zodSchema/auth.schema";
import { NextRequest } from "next/server";


export const POST = async function (request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json() as TypeOfResetPasswordInput;

        const checkValidation = resetPasswordZodSchema.safeParse(body);

        if (!checkValidation.success) {
            throw new ApiError(400, "Invalid input or missing fields", {
                errors: checkValidation.error,
            });
        }
        const { password } = checkValidation.data;

        const token = body?.token;

        if (!token) {
            throw new ApiError(400, "Token is required to reset password.");
        }

        const { userId } = await verifyToken(token);

        if (!userId) {
            throw new ApiError(401, "Invalid or expired token.");
        }

        const user = await User.findById<IUser>(userId);

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        user.password = password;
        await user.save();
        await VerifyTokenModel.deleteMany({ email: (user.email) });

        return apiResponse(200, "Your password has been reset successfully.");

    } catch (error) {
        return errorHandler(error)
    }
}