import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    slug: string;
    brand: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    subcategory: mongoose.Types.ObjectId;
    mrp: number;
    sellingPrice: number;
    discountPercentage: number;
    media: mongoose.Types.ObjectId[];
    description?: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    media: [
        {
            type: Schema.Types.ObjectId,
            ref: "Media",
            required: true,
        },
    ],
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },
}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
