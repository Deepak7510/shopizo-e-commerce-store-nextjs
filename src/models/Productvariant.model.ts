import mongoose, { Document } from "mongoose";

interface IProductVariant extends Document {
    productId: mongoose.Types.ObjectId;
    sku: string;
    size: string;
    color: string;
    material: string;
    mrp: number;
    sellingPrice: number;
    discountPercentage: number;
    stock: number;
    isDefault: boolean;
    media: mongoose.Types.ObjectId[];
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const productVariantSchema = new mongoose.Schema<IProductVariant>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    material: {
        type: String,
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
    stock: {
        type: Number,
        default: 0
    },
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
    }],
    isDefault: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });


const ProductVariantModel = mongoose.models.ProductVariantModel || mongoose.model("ProductVariantModel", productVariantSchema);
export default ProductVariantModel;
