import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import ProductModel from "@/models/Product.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        const pipeline: any[] = [
            { $match: { deletedAt: null } },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $unwind: {
                    path: "$brand",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    from: "productvariants",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$productId", "$$productId"] },
                                        { $eq: ["$isDefault", true] }
                                    ]
                                }
                            }
                        },
                        { $limit: 1 },
                        {
                            $lookup: {
                                from: "media",
                                localField: "media",
                                foreignField: "_id",
                                as: "media"
                            }
                        }
                    ],
                    as: "defaultVariant"
                }
            },
            {
                $match: {
                    "defaultVariant.0": { $exists: true }
                }
            },
            {
                $limit: 8
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
                    defaultVariant: 1
                }
            }
        ];

        const products = await ProductModel.aggregate(pipeline);

        return apiResponse(200, "Features Products fetched successfully", { products });
    } catch (error) {
        return errorHandler(error);
    }
};
