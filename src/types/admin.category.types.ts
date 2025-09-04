import {
  addCategoryZodSchema,
  editCatgeoryZodSchema,
} from "@/zodSchema/admin.category.schema";
import { z } from "zod";
export type TypeOfAddCategoryInput = z.infer<typeof addCategoryZodSchema>;
export type TypeOfEditCategoryInput = z.infer<typeof editCatgeoryZodSchema>;

export type TypeOfCategoryData = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
