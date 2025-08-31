import mongoose, { Document } from "mongoose";

export interface IBrand extends Document {
    name: string;
    slug: string;
    description: string,
    website: string,
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const brandSchema = new mongoose.Schema<IBrand>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }

}, { timestamps: true });


const BrandModel = mongoose.models.Brand || mongoose.model<IBrand>("Brand", brandSchema);
export default BrandModel;