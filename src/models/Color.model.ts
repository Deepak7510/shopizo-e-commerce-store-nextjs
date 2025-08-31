import mongoose, { Document } from "mongoose";

export interface IColor extends Document {
    name: string;
    slug: string;
    hexCode: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

const colorSchema = new mongoose.Schema<IColor>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    hexCode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });

const ColorModel = mongoose.models.Color || mongoose.model<IColor>("Color", colorSchema);
export default ColorModel;