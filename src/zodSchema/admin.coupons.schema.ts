import commonZodSchema from "./common.schema";

export const addCouponZodSchema = commonZodSchema.pick({
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,
});


export const editCouponZodSchema = commonZodSchema.pick({
    _id: true,
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,
})