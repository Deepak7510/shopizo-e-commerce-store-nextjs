import mongoose, { Document } from "mongoose";

export interface IBrand extends Document {
    name: string;
    slug: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const brandSchema = new mongoose.Schema<IBrand>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }

}, { timestamps: true });


const BrandModel = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default BrandModel;