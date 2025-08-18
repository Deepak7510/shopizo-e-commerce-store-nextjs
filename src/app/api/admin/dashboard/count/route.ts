import apiResponse from "@/lib/server/apiResponse";
import { connectDB } from "@/lib/server/databaseConnection";
import { errorHandler } from "@/lib/server/errorHandler";
import { verifyRole } from "@/lib/server/verifyRole";
import BrandModel from "@/models/Brand.model";
import CategoryModel from "@/models/Category.model";
import CouponModel from "@/models/Coupon.model";
import MediaModel from "@/models/Media.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/Productvariant.model";
import SubcategoryModel from "@/models/Subcategory.model";
import User, { UserRole } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();
        await verifyRole(request, UserRole.ADMIN);

        const userCount = await User.find({ deletedAt: null, role: { $ne: "admin" } }).countDocuments();
        const categoriesCount = await CategoryModel.find({ deletedAt: null }).countDocuments();
        const brandsCount = await BrandModel.find({ deletedAt: null }).countDocuments();
        const subcategoriesCount = await SubcategoryModel.find({ deletedAt: null }).countDocuments();
        const productsCount = await ProductModel.find({ deletedAt: null }).countDocuments();
        const couponsCount = await CouponModel.find({ deletedAt: null }).countDocuments();
        const productVariantCount = await ProductVariantModel.find({ deleted: null }).countDocuments();

        return apiResponse(200, "All Count fetched successfully", {
            userCount,
            categoriesCount,
            brandsCount,
            subcategoriesCount,
            productsCount,
            couponsCount,
            productVariantCount,
        });
    } catch (error) {
        return errorHandler(error);
    }
}