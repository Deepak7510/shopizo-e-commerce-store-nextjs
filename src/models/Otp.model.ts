import mongoose from "mongoose";

export interface IOtp extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    createdAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
    }
})

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTPModel = mongoose.models.Otp || mongoose.model<IOtp>('Otp', otpSchema);
export default OTPModel;