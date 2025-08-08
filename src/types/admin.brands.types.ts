import { addBrandZodSchema, editBrandZodSchema } from "@/zodSchema/admin.brands.schema";
import { z } from "zod";

export type TypesOfAddBrandInput = z.infer<typeof addBrandZodSchema>
export type TypesOfEditBrandInput = z.infer<typeof editBrandZodSchema>

export type TypesOfBrandData = {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
};