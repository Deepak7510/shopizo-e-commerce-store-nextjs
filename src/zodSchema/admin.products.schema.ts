import commonZodSchema from "./common.schema";

export const addProductZodSchema = commonZodSchema.pick({
    title: true,
    slug: true,
    brand: true,
    category: true,
    subcategory: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    description: true,
    media: true,
});

export const editProductZodSchema = commonZodSchema.pick({
    _id: true,
    title: true,
    slug: true,
    brand: true,
    category: true,
    subcategory: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    description: true,
    media: true,
})