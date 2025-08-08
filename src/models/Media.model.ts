import mongoose, { Document, Schema } from "mongoose";

export interface IMedia extends Document {
    asset_id: string;
    public_id: string;
    secure_url: string;
    path: string;
    thumbnail_url: string;
    alt: string;
    title: string;
    deletedAt: Date | null;
}

const mediaSchema = new Schema<IMedia>({
    asset_id: {
        type: String,
        required: true,
        trim: true
    },
    public_id: {
        type: String,
        required: true,
        trim: true
    },
    secure_url: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail_url: {
        type: String,
        required: true,
        trim: true
    },
    alt: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });


const MediaModel = mongoose.models.Media || mongoose.model<IMedia>("Media", mediaSchema);

export default MediaModel;