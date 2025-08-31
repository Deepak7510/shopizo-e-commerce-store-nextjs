import mongoose, { Document, ObjectId } from "mongoose";

export interface ISubcategory extends Document {
    name: string;
    slug: string;
    category: ObjectId;
    description: string,
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const subcategorySchema = new mongoose.Schema<ISubcategory>(
    {
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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: {
            type: String
        },
        deletedAt: {
            type: Date,
            default: null,
            index: true
        },
    },
    { timestamps: true }
);

const SubcategoryModel =
    mongoose.models.Subcategory ||
    mongoose.model<ISubcategory>("Subcategory", subcategorySchema);
export default SubcategoryModel;
