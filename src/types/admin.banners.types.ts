import { addBannerZodSchema, editBannerZodSchema } from "@/zodSchema/admin.banner.schema";
import { z } from "zod";

export type TypeOfAddBannerInput = z.infer<typeof addBannerZodSchema>
export type TypeOfEditBannerInput = z.infer<typeof editBannerZodSchema>

export type TypeOfBannerData = {
    _id: string;
    name: string;
    title: string;
    subtitle: string;
    buttonName: string;
    link: string;
    type: string;
    bannerImage: {
        _id: string,
        title: string,
        secure_url: string,
        alt: string
    },
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date | null;
};
