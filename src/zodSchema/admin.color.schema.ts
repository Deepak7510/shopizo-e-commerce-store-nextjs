
import commonZodSchema from "./common.schema";

export const addColorZodSchema = commonZodSchema.pick({
    name: true,
    slug: true,
    description: true,
    hexCode: true,
});


export const editColorZodSchema = commonZodSchema.pick({
    _id: true,
    name: true,
    slug: true,
    description: true,
    hexCode: true,
})