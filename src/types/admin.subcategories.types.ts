import { addSubcategoryZodSchema, editSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema";
import { z } from "zod";
import { TypeOfCategoryData } from "./admin.category.types";

export type TypeOfAddSubcategoryInput = z.infer<typeof addSubcategoryZodSchema>
export type TypeOfEditSubcategoryInput = z.infer<typeof editSubcategoryZodSchema>

export type TypeOfSubcategoryData = {
    _id: string;
    name: string;
    slug: string;
    category: TypeOfCategoryData;
    createdAt: Date;
    updatedAt: Date;
};

