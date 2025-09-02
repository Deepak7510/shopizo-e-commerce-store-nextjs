import { addProductZodSchema, editProductZodSchema } from "@/zodSchema/admin.products.schema";
import { z } from "zod";
import { TypeOfCategoryData } from "./admin.category.types";
import { TypeOfBrandData } from "./admin.brands.types";
import { TypeOfSubcategoryData } from "./admin.subcategories.types";

export type TypeOfAddProductInput = z.infer<typeof addProductZodSchema>
export type TypeOfEditProductInput = z.infer<typeof editProductZodSchema>

export type TypeOfProductData = {
    _id: string;
    title: string;
    slug: string;
    brand: TypeOfBrandData;
    category: TypeOfCategoryData;
    subcategory: TypeOfSubcategoryData;
    mrp: number,
    sellingPrice: number;
    discountPercentage: number;
    description: string;
    media: any[]
    createdAt?: Date;
    updatedAt?: Date;
};