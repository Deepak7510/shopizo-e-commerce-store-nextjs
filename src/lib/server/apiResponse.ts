import { NextResponse } from "next/server";

const apiResponse = function (statusCode: number, message: string, data?: unknown, resType?: string) {
    return NextResponse.json({
        statusCode,
        success: true,
        message,
        data: data || null,
        resType: resType || "toast"
    }, { status: statusCode });

}

export default apiResponse;