import mongoose, { Document, ObjectId } from "mongoose";

export interface ISubcategory extends Document {
    name: string;
    slug: string;
    category: ObjectId;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const subcategorySchema = new mongoose.Schema<ISubcategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
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
    mongoose.model("Subcategory", subcategorySchema);
export default SubcategoryModel;
