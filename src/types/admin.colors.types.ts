import { addColorZodSchema, editColorZodSchema } from "@/zodSchema/admin.color.schema";
import { z } from "zod";

export type TypeOfAddColorInput = z.infer<typeof addColorZodSchema>
export type TypeOfEditColorInput = z.infer<typeof editColorZodSchema>

export type TypeOfColorData = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    hexCode: string;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
};