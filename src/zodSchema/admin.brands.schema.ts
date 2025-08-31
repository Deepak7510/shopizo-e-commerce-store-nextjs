import commonZodSchema from "./common.schema";

export const addBrandZodSchema = commonZodSchema.pick({
    name: true,
    slug: true,
    description: true,
    website: true,
})


export const editBrandZodSchema = commonZodSchema.pick({
    _id: true,
    name: true,
    slug: true,
    description: true,
    website: true,
})
