import { addSubcategoryZodSchema, editSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema";
import { z } from "zod";
import { TypesOfCategoryData } from "./admin.category.types";

export type TypesOfAddSubcategoryInput = z.infer<typeof addSubcategoryZodSchema>
export type TypesOfEditSubcategoryInput = z.infer<typeof editSubcategoryZodSchema>

export type TypesOfSubcategoryData = {
    _id: string;
    name: string;
    slug: string;
    category: TypesOfCategoryData;
    createdAt: Date;
    updatedAt: Date;
};

