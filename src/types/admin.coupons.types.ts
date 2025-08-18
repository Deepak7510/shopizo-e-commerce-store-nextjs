import { z } from "zod";
import { addCouponZodSchema, editCouponZodSchema } from "@/zodSchema/admin.coupons.schema";

export type TypeOfAddCouponInput = z.infer<typeof addCouponZodSchema>
export type TypeOfEditCouponInput = z.infer<typeof editCouponZodSchema>

export type TypeOfCouponData = {
    _id: string;
    code: string,
    minShoppingAmount: number;
    discountPercentage: number;
    validity: Date;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};