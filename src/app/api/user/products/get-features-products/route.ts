import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import ProductModel from "@/models/Product.model";
import { NextResponse } from "next/server";

export const GET = async function (): Promise<NextResponse> {
  try {
    await connectDB();
    const pipeline: any[] = [
      { $match: { deletedAt: null } },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },

      {
        $unwind: {
          path: "$brand",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "media",
          localField: "media",
          foreignField: "_id",
          as: "media",
        },
      },
      {
        $limit: 10,
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          brand: {
            _id: "$brand._id",
            name: "$brand.name",
          },
          media: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
        },
      },
    ];

    const products = await ProductModel.aggregate(pipeline);

    return apiResponse(200, "Features Products fetched successfully", {
      products,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
