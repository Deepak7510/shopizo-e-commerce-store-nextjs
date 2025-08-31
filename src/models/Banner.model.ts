import mongoose, { Document } from "mongoose";

export enum BannerType {
    HERO = 'hero',
    SLIDER = 'slider',
    PROMO = 'promo',
    BIGPROMO = 'bigpromo',
    SIDEBAR = 'sidebar',
    POPUP = 'popup'
};


export interface IBanner extends Document {
    name: string;
    title: string;
    subtitle: string;
    buttonName: string;
    link: string;
    type: BannerType;
    bannerImage: mongoose.Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    impressions: number;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

const bannerSchema = new mongoose.Schema<IBanner>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    buttonName: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(BannerType),
        default: BannerType.SLIDER
    },
    bannerImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });

const BannerModel = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
export default BannerModel;