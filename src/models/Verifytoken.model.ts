import mongoose, { Document, Schema } from "mongoose";

export interface IVerifyToken extends Document {
    email: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const verifyTokenSchema = new Schema<IVerifyToken>({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
});

verifyTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerifyTokenModel =
    mongoose.models.VerifyToken ||
    mongoose.model<IVerifyToken>("VerifyToken", verifyTokenSchema);

export default VerifyTokenModel;
