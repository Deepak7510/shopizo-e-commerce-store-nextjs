import mongoose, { Document } from "mongoose"

export interface ICategory extends Document {
    name: string,
    slug: string,
    description: string,
    deletedAt: Date | null
    createAt: Date,
    updatedAt: Date
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });


const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel