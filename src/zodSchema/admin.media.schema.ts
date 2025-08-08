import z from "zod";
import commonZodSchema from "./common.schema";

export const uploadMediaZodSchema = commonZodSchema.pick({
    asset_id: true,
    public_id: true,
    secure_url: true,
    path: true,
    thumbnail_url: true,
});

export const uploadMediaArrayZodSchema = z.array(uploadMediaZodSchema);


export const editMediaZodSchema = commonZodSchema.pick({
    _id: true,
    title: true,
    alt: true
})