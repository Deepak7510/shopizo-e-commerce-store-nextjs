import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductModel from "@/models/Product.model";
import { UserRole } from "@/models/User.model";
import { TypeOfDeleteType } from "@/types/global.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(req, UserRole.ADMIN);

        const searchParams = req.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const page = parseInt(searchParams.get("page") || "0", 10);
        const deleteType = (searchParams.get("deleteType") || "SD") as TypeOfDeleteType;
        const sortby = searchParams.get("sortby") || "_id";
        const order = (searchParams.get("order") || "desc") as "desc" | "asc";
        const globalFilter = searchParams.get("globalFilter") || "";

        if (!["SD", "PD"].includes(deleteType)) {
            throw new ApiError(403, "Invalid delete type");
        }

        const pipeline: any[] = [];

        let filter = {}
        if (deleteType === "SD") {
            filter = { deletedAt: null };
        } else if (deleteType === "PD") {
            filter = { deletedAt: { $ne: null } };
        }

        pipeline.push({
            $match: filter
        })

        pipeline.push({
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            },
        });

        pipeline.push({
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true
            }
        });

        pipeline.push({
            $lookup: {
                from: "subcategories",
                localField: "subcategory",
                foreignField: "_id",
                as: "subcategory"
            },
        });

        pipeline.push({
            $unwind: {
                path: "$subcategory",
                preserveNullAndEmptyArrays: true
            }
        });

        pipeline.push({
            $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand"
            },
        });

        pipeline.push({
            $unwind: {
                path: "$brand",
                preserveNullAndEmptyArrays: true
            }
        });


        pipeline.push({
            $lookup: {
                from: "media",
                localField: "media",
                foreignField: "_id",
                as: "media"
            }
        });


        if (globalFilter) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: globalFilter, $options: "i" } },
                        { slug: { $regex: globalFilter, $options: "i" } },
                        { "brand.name": { $regex: globalFilter, $options: "i" } },
                        { "category.name": { $regex: globalFilter, $options: "i" } },
                        { "subcategory.name": { $regex: globalFilter, $options: "i" } },
                    ],
                }
            });
        }


        pipeline.push({
            $sort: {
                [sortby]: order === "asc" ? 1 : -1,
            },
        });

        pipeline.push(
            { $skip: page * limit },
            { $limit: limit }
        );

        pipeline.push({
            $project: {
                _id: 1,
                title: 1,
                slug: 1,
                category: {
                    _id: "$category._id",
                    name: "$category.name",
                    slug: "$category.slug"
                },
                subcategory: {
                    _id: "$subcategory._id",
                    name: "$subcategory.name",
                    slug: "$subcategory.slug"
                },
                brand: {
                    _id: "$brand._id",
                    name: "$brand.name",
                    slug: "$brand.slug"
                },
                mrp: 1,
                sellingPrice: 1,
                discountPercentage: 1,
                description: 1,
                media: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        });

        const dataList = await ProductModel.aggregate(pipeline);
        const totalRow = await ProductModel.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        return apiResponse(200, "Products fetched successfully", { dataList, totalRow, totalPage });
    } catch (error) {
        return errorHandler(error as Error);
    }
};
