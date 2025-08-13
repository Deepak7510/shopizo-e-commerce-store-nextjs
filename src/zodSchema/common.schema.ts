import { z } from "zod";

const toNumber = (val: unknown) => {
    if (val === "" || val === null || val === undefined) return undefined;
    return Number(val);
};

const commonZodSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required.")
        .min(3, "Name must be atleast 4 character"),
    email: z
        .string()
        .nonempty("Email is required.")
        .email("Invalid email format."),
    password: z
        .string()
        .nonempty("Password is required.")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().nonempty("Confirm password is required."),
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    token: z.string().nonempty("Token is required."),

    asset_id: z.string().nonempty("Asset id is required."),
    public_id: z.string().nonempty("Public id is required."),
    secure_url: z.string().url().nonempty("Secure url is required."),
    path: z.string().nonempty("Path url is required."),
    thumbnail_url: z.string().url().optional(),

    _id: z.string().nonempty("Id is required."),
    title: z
        .string()
        .nonempty("Title is required.")
        .min(3, "Title must be at least 3 character long."),
    alt: z
        .string()
        .nonempty("Alt is required.")
        .min(3, "Alt must be at least 3 character long."),
    slug: z
        .string()
        .nonempty("Slug is required.")
        .min(3, "Slug must be at least 3 character long."),
    category: z.string().nonempty("Category Name is required."),
    subcategory: z.string().nonempty("Subcategory Name is required."),
    brand: z.string().nonempty("Brand Name is required."),
    media: z
        .array(z.string().nonempty("Media ID cannot be empty."))
        .min(1, "At least one media item is required."),
    description: z.string().optional(),

    productId: z.string().nonempty("Product id is required."),
    sku: z
        .string().nonempty("SKU is required.")
        .min(3, "SKU must be at least 3 characters long.")
        .max(50, "SKU must not exceed 50 characters."),
    size: z
        .string().nonempty("Size is required.")
        .min(1, "Size must not be empty."),
    color: z
        .string().nonempty("Color is required.")
        .min(3, "Color must be at least 3 characters long."),
    material: z
        .string().nonempty("Material is required.")
        .min(3, "Material must be at least 3 characters long."),
    stock: z.preprocess(
        toNumber,
        z
            .number({ invalid_type_error: "Stock must be a number." })
            .int("Stock must be an integer.")
            .nonnegative("Stock cannot be negative.")
            .optional()
    ),
    mrp: z.preprocess(
        toNumber,
        z
            .number({
                required_error: "MRP is required",
                invalid_type_error: "MRP must be a valid number",
            })
            .positive("MRP must be greater than 0")
    ),

    sellingPrice: z.preprocess(
        toNumber,
        z
            .number({
                required_error: "Selling Price is required",
                invalid_type_error: "Selling Price must be a valid number",
            })
            .positive("Selling Price must be greater than 0")
    ),
    discountPercentage: z.preprocess(
        toNumber,
        z
            .number({
                required_error: "Discount Percentage is required",
                invalid_type_error: "Discount Percentage must be a valid number",
            })
            .min(0, "Discount can't be negative")
            .max(100, "Discount can't be more than 100%")
    ),
    isDefault: z.boolean({ required_error: "Deafult is required." })
});

export default commonZodSchema;
