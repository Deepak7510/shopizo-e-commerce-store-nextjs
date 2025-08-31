import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import ProductVariantModel from "@/models/Productvariant.model";
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
            pipeline.push({ $match: { deletedAt: null } });
        } else if (deleteType === "PD") {
            filter = { deletedAt: { $ne: null } };
            pipeline.push({ $match: { deletedAt: { $ne: null } } });
        }

        pipeline.push({
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        });

        pipeline.push({
            $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: true
            }
        });


        pipeline.push({
            $lookup: {
                from: "colors",
                localField: "color",
                foreignField: "_id",
                as: "color"
            }
        })

        pipeline.push({
            $unwind: {
                preserveNullAndEmptyArrays: true,
                path: "$color",
            }
        })

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
                        { sku: { $regex: globalFilter, $options: "i" } },
                        { 'color.name': { $regex: globalFilter, $options: "i" } },
                        { size: { $regex: globalFilter, $options: "i" } },
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
                productId: {
                    _id: "$product._id",
                    title: "$product.title",
                    slug: "$product.slug"
                },
                color: {
                    _id: "$color._id",
                    name: "$color.name",
                    hexCode: "$color.hexCode"
                },
                sku: 1,
                size: 1,
                stock: 1,
                mrp: 1,
                material: 1,
                sellingPrice: 1,
                discountPercentage: 1,
                isDefault: 1,
                media: 1,
                createdAt: 1,
                updatedAt: 1,
                deletedAt: 1
            },
        });

        const dataList = await ProductVariantModel.aggregate(pipeline);
        const totalRow = await ProductVariantModel.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        return apiResponse(200, "Product Variants fetched successfully", { dataList, totalRow, totalPage });
    } catch (error) {
        return errorHandler(error as Error);
    }
};
