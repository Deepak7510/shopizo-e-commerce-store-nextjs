import bcrypt from "bcryptjs";
import mongoose, { Document, Schema, HydratedDocument } from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    avatar: string;
    isEmailVerified: boolean;
    phone: string;
    address: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
        avatar: { type: String, trim: true },
        isEmailVerified: { type: Boolean, default: false },
        phone: { type: String, trim: true },
        address: { type: String, trim: true },
        deletedAt: { type: Date, default: null, index: true },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const user = this as HydratedDocument<IUser>;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (
    this: IUser,
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema, "users");
export default User;
