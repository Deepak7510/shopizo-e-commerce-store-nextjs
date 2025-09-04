import { z } from "zod";
import {
  addProductVarinatZodSchema,
  editProductVarinatZodSchema,
} from "@/zodSchema/admin.productvariants.schema";
import { mediaType } from "./admin.media.types";
import { TypeOfColorData } from "./admin.colors.types";

export type TypeOfAddProductVarinatInput = z.infer<
  typeof addProductVarinatZodSchema
>;
export type TypeOfEditProductVarinatInput = z.infer<
  typeof editProductVarinatZodSchema
>;

export type TypeOfProductVariantData = {
  _id: string;
  productId: any;
  sku: string;
  color: TypeOfColorData;
  size: string;
  mrp: number;
  stock: number;
  sellingPrice: number;
  discountPercentage: number;
  isDefault: boolean;
  material: string;
  media: mediaType[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
