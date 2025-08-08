import mongoose, { Document } from "mongoose"

export interface ICategory extends Document {
    name: string,
    slug: string,
    deletedAt: Date | null
    createAt: Date,
    updatedAt: Date
}


const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });


const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel