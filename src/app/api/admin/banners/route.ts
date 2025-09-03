import { ApiError } from "@/lib/server/apiError";
import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BannerModel from "@/models/Banner.model";
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
                from: "media",
                localField: "bannerImage",
                foreignField: "_id",
                as: "bannerImage"
            },
        });

        pipeline.push({
            $unwind: {
                path: "$bannerImage",
                preserveNullAndEmptyArrays: true
            }
        });

        if (globalFilter) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: globalFilter, $options: "i" } },
                        { name: { $regex: globalFilter, $options: "i" } },
                        { type: { $regex: globalFilter, $options: "i" } },
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
                name: 1,
                title: 1,
                subtitle: 1,
                buttonName: 1,
                link: 1,
                type: 1,
                bannerImage: {
                    _id: "$bannerImage._id",
                    title: "$bannerImage.title",
                    secure_url: "$bannerImage.secure_url",
                    alt: "$bannerImage.alt",
                },
                startDate: 1,
                endDate: 1,
                createdAt: 1,
                deletedAt: 1
            },
        });

        const dataList = await BannerModel.aggregate(pipeline);
        const totalRow = await BannerModel.find(filter).countDocuments();
        const totalPage = Math.ceil(totalRow / limit);

        return apiResponse(200, "Banners fetched successfully", { dataList, totalRow, totalPage });
    } catch (error) {
        return errorHandler(error as Error);
    }
};
