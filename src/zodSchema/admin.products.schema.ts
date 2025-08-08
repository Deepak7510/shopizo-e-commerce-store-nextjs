import commonZodSchema from "./common.schema";

export const addProductZodSchema = commonZodSchema.pick({
    title: true,
    slug: true,
    brand: true,
    category: true,
    subcategory: true,
    media: true,
    description: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true
}).refine((data) => data.sellingPrice <= data.mrp, {
    message: "Selling Price should not be more than MRP.",
    path: ["sellingPrice"],
})

export const editProductZodSchema = commonZodSchema.pick({
    _id: true,
    title: true,
    slug: true,
    brand: true,
    category: true,
    subcategory: true,
    media: true,
    description: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true
}).refine((data) => data.sellingPrice <= data.mrp, {
    message: "Selling Price should not be more than MRP.",
    path: ["sellingPrice"],
})