import commonZodSchema from "./common.schema";

export const addCategoryZodSchema = commonZodSchema.pick({
    name: true,
    slug: true,
    description: true
})

export const editCatgeoryZodSchema = commonZodSchema.pick({
    _id: true,
    name: true,
    slug: true,
    description: true
})
