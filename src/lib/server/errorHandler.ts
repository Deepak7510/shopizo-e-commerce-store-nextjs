import { NextResponse } from "next/server";
import { ApiError } from "./apiError";

export const errorHandler = (error: unknown) => {
    console.error("Error caught by errorHandler:", error);
    if (error instanceof ApiError) {
        return NextResponse.json({
            statusCode: error.statusCode,
            success: error.success,
            message: error.message,
            data: error.data || null
        }, { status: error.statusCode });
    }

    return NextResponse.json({
        statusCode: 500,
        success: false,
        message: "Internal Server Error"
    }, { status: 500 });
};
