import commonZodSchema from "./common.schema";

export const addProductVarinatZodSchema = commonZodSchema.pick({
    productId: true,
    sku: true,
    color: true,
    size: true,
    material: true,
    stock: true,
    media: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    isDefault: true,
}).refine((data) => data.sellingPrice <= data.mrp, {
    message: "Selling Price should not be more than MRP.",
    path: ["sellingPrice"],
})

export const editProductVarinatZodSchema = commonZodSchema.pick({
    _id: true,
    productId: true,
    sku: true,
    color: true,
    size: true,
    material: true,
    stock: true,
    media: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    isDefault: true
}).refine((data) => data.sellingPrice <= data.mrp, {
    message: "Selling Price should not be more than MRP.",
    path: ["sellingPrice"],
})