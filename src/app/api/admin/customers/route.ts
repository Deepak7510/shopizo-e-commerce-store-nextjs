import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import User, { UserRole } from "@/models/User.model";
import { TypeOfDeleteType } from "@/types/global.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "0", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const deleteType = searchParams.get("deleteType") as TypeOfDeleteType;
        const sortby = searchParams.get("sortby") || "_id";
        const order = (searchParams.get("order") || "desc") as "desc" | "asc";
        const globalFilter = searchParams.get("globalFilter") || "";

        if (!["SD", "PD"].includes(deleteType)) {
            throw new ApiError(403, "Invalid delete type");
        }

        const pipeline: any[] = [];

        let filter = {}

        if (deleteType === "SD") {
            filter = { deletedAt: null }
        } else {
            filter = {
                deletedAt: { $ne: null }
            }
        }

        pipeline.push({
            $match: {
                ...filter,
                role: UserRole.USER,
                $or: [
                    {
                        name: { $regex: globalFilter, $options: "i" },
                        email: { $regex: globalFilter, $options: "i" }
                    }
                ]
            }
        });

        pipeline.push({
            $sort: {
                [sortby]: order === "asc" ? 1 : -1,
            },
        });

        pipeline.push({ $skip: page * limit }, { $limit: limit })

        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                avatar: 1,
                phone: 1,
                isEmailVerified: 1,
                deletedAt: 1,
                createdAt: 1,
                updatedAt: 1
            }
        })

        const dataList = await User.aggregate(pipeline);
        const totalRow = await User.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        return apiResponse(200, "Customers fetched successfully", { dataList, totalPage, totalRow })
    } catch (error) {
        return errorHandler(error)
    }
}