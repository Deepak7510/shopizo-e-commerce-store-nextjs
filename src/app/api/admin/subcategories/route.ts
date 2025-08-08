import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import SubcategoryModel from "@/models/Subcategory.model";
import { UserRole } from "@/models/User.model";
import { TypesOfDeleteType } from "@/types/global.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(req, UserRole.ADMIN);
        const searchParams = await req.nextUrl.searchParams;

        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const deleteType = searchParams.get("deleteType") as TypesOfDeleteType;
        const globalFilter = searchParams.get("globalFilter") || "";
        const sortby = searchParams.get("sortby") || "_id";
        const order = (searchParams.get("order") || "desc") as "asc" | "desc";

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
            $sort: {
                [sortby]: order === "asc" ? 1 : -1,
            },
        });

        pipeline.push(
            { $skip: page * limit },
            { $limit: limit }
        );


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

        if (globalFilter) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: globalFilter, $options: "i" } },
                        { slug: { $regex: globalFilter, $options: "i" } },
                        { "category.name": { $regex: globalFilter, $options: "i" } }
                    ],
                }
            });
        }


        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                slug: 1,
                category: {
                    _id: "$category._id",
                    name: "$category.name",
                    slug: "$category.slug"
                },
                createdAt: 1,
                updatedAt: 1,
                deletedAt: 1
            },
        });



        const dataList = await SubcategoryModel.aggregate(pipeline);
        const totalRow = await SubcategoryModel.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        console.log(dataList)

        return apiResponse(200, "Subcategories fetched successfully", { dataList, totalRow, totalPage });
    } catch (error) {
        return errorHandler(error as Error);
    }
};
