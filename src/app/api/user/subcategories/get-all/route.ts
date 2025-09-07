import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import SubcategoryModel from "@/models/Subcategory.model";
import { NextResponse } from "next/server";

export const GET = async function (): Promise<NextResponse> {
  try {
    await connectDB();
    const subcategories = await SubcategoryModel.find({
      deletedAt: null,
    }).select("name slug");
    return apiResponse(200, "User subcategories fetched successfully", {
      subcategories,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
