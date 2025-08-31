

export type TypeOfCustomersData = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    avatar?: string
}