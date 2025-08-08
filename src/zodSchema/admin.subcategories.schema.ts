import commonZodSchema from "./common.schema";

export const addSubcategoryZodSchema = commonZodSchema.pick({
    name: true,
    slug: true,
    category: true
});


export const editSubcategoryZodSchema = commonZodSchema.pick({
    _id: true,
    name: true,
    slug: true,
    category: true
});