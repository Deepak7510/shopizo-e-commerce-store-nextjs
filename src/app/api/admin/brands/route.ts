

import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BrandModel, { IBrand } from "@/models/Brand.model";
import { UserRole } from "@/models/User.model";
import { TypeOfDeleteType } from "@/types/global.types";
import { NextRequest, NextResponse } from "next/server";



export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const page = parseInt(searchParams.get("page") || "0", 10);
        const deleteType = (searchParams.get("deleteType") || "SD") as TypeOfDeleteType;
        const sortby = searchParams.get("sortby") || "_id";
        const order = (searchParams.get("order") || "desc") as "desc" | "asc";
        const globalFilter = searchParams.get("globalFilter") || "";

        if (!["SD", "PD"].includes(deleteType)) {
            throw new ApiError(403, "Invalid delete type.");
        }

        let filter = {};
        if (deleteType === "SD") {
            filter = { deletedAt: null }
        } else {
            filter = { deletedAt: { $ne: null } }
        }

        const pipeline: any = []

        pipeline.push({
            $match: filter,
        });

        pipeline.push({ $limit: limit }, { $skip: (limit * page), });

        pipeline.push({
            $sort: { [sortby]: order === "asc" ? 1 : -1 },
        })

        if (globalFilter) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: globalFilter, $options: "i" } },
                        { slug: { $regex: globalFilter, $options: "i" } },
                    ],
                },
            });
        }

        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                slug: 1,
                createdAt: 1,
                updatedAt: 1,
                deletedAt: 1
            }

        })

        const dataList = await BrandModel.aggregate(pipeline);
        const totalRow = await BrandModel.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        return apiResponse(200, "Brands fetched successfully.", {
            dataList,
            totalRow,
            totalPage
        });

    } catch (error) {
        return errorHandler(error)
    }
}
