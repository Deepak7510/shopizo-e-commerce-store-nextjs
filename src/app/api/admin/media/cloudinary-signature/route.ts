import cloudinary from "@/lib/server/cloudinaryConfig";
import { errorHandler } from "@/lib/server/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { paramsToSign } = body;

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET!
        );

        return NextResponse.json({
            signature,
            timestamp: paramsToSign.timestamp,
        });

    } catch (error) {
        return errorHandler(error);
    }
};
