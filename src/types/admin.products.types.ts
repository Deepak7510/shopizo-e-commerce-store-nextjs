import { addProductZodSchema, editProductZodSchema } from "@/zodSchema/admin.products.schema";
import { z } from "zod";

export type TypesOfAddProductInput = z.infer<typeof addProductZodSchema>
export type TypesOfEditProductInput = z.infer<typeof editProductZodSchema>