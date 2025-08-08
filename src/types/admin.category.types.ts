import { addCategoryZodSchema, editCatgeoryZodSchema } from "@/zodSchema/admin.category.schema";
import { z } from "zod";
export type TypesOfAddCategoryInput = z.infer<typeof addCategoryZodSchema>
export type TypesOfEditCategoryInput = z.infer<typeof editCatgeoryZodSchema>

export type TypesOfCategoryData = {
    _id: string;
    name: string;
    slug: string;
    deletedAt: Date | null
    createdAt?: Date;
    updatedAt?: Date;
}