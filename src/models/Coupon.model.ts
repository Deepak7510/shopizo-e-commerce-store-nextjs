import mongoose, { Document } from "mongoose"

export interface ICoupon extends Document {
    code: string;
    discountPercentage: number;
    minShoppingAmount: number;
    validity: Date;
    deletedAt: Date | null
}


const couponSchema = new mongoose.Schema<ICoupon>({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    minShoppingAmount: {
        type: Number,
        required: true,
        trim: true
    },
    validity: {
        type: Date,
        required: true
    },

    deletedAt: {
        type: Date,
        default: null,
        index: true
    }
}, { timestamps: true });


const CouponModel = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema)
export default CouponModel;

