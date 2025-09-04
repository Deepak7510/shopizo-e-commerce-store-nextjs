import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import BrandModel from "@/models/Brand.model";
import { NextResponse } from "next/server";

export const GET = async function (): Promise<NextResponse> {
  try {
    await connectDB();
    const brands = await BrandModel.find({ deletedAt: null }).select(
      "name slug"
    );
    return apiResponse(200, "User brands fetched successfully", {
      brands,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
