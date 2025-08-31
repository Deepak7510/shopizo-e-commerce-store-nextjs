import { addBrandZodSchema, editBrandZodSchema } from "@/zodSchema/admin.brands.schema";
import { z } from "zod";

export type TypeOfAddBrandInput = z.infer<typeof addBrandZodSchema>
export type TypeOfEditBrandInput = z.infer<typeof editBrandZodSchema>

export type TypeOfBrandData = {
    _id: string;
    name: string;
    slug: string;
    description: string,
    website: string,
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
};