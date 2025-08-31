import commonZodSchema from "./common.schema";

export const addBannerZodSchema = commonZodSchema.pick({
    name: true,
    title: true,
    subtitle: true,
    buttonName: true,
    link: true,
    type: true,
    startDate: true,
    endDate: true,
    bannerImage: true,
})


export const editBannerZodSchema = commonZodSchema.pick({
    _id: true,
    name: true,
    title: true,
    subtitle: true,
    buttonName: true,
    link: true,
    type: true,
    startDate: true,
    endDate: true,
    bannerImage: true,
})
