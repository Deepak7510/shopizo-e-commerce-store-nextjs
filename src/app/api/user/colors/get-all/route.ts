import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import ColorModel from "@/models/Color.model";
import { NextResponse } from "next/server";

export const GET = async function (): Promise<NextResponse> {
  try {
    await connectDB();
    const colors = await ColorModel.find({ deletedAt: null }).select(
      "name slug"
    );
    return apiResponse(200, "User colors fetched successfully", {
      colors,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
