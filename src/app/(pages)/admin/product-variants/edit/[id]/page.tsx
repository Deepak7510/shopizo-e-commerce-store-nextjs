"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { use, useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/application/common/ButtonLoading";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { mediaType } from "@/types/admin.media.types";
import SelectMediaModel from "@/components/application/admin/SelectMediaModel";
import Image from "next/image";
import { editProductVarinatZodSchema } from "@/zodSchema/admin.productvariants.schema";
import { TypeOfEditProductVarinatInput, TypeOfProductVariantData } from "@/types/admin.productvariants.types";
import { Switch } from "@/components/ui/switch";
import { updateProductVariantService } from "@/services/client/productVariants/updateProductVariantService";
import { useRouter } from "next/navigation";
import AddProductVariantSkeleton from "@/components/application/admin/AddProductVariantSkeleton";

const sizeData = [
    {
        label: "S",
        value: "S"
    },
    {
        label: "M",
        value: "M"
    },
    {
        label: "L",
        value: "L"
    },
    {
        label: "XL",
        value: "XL"
    },
    {
        label: "XXL",
        value: "XXL"
    },
]

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: adminRoutes.products.products,
        title: "Products",
    },
    {
        href: "",
        title: "Edit Product Variant",
    },
];

const EditProductVariantPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { id } = use(params);
    const [openSelectMediaModel, setOpenSelectMediaModel] =
        useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<mediaType[]>([]);

    const {
        data: productData,
        loading: productLoading,
        error: productError,
    } = useFetch(`/api/admin/products/fetch-all`, {}, []);

    const {
        data: productVariantData,
        loading: productVariantLoading,
        error: productVariantError,
    } = useFetch(`/api/admin/product-variants/details/${id}`, {}, [id]);


    if (productError || productVariantError) {
        return (
            <div className="text-xl text-red-700 font-medium">
                {productError?.message ||
                    productVariantError?.message ||
                    "Something went worng."}
            </div>
        );
    }

    const productList = productData?.data?.allDataList;

    const form = useForm<TypeOfEditProductVarinatInput>({
        resolver: zodResolver(editProductVarinatZodSchema),
        defaultValues: {
            _id: "",
            productId: "",
            sku: "",
            size: "",
            color: "",
            material: "",
            stock: 0,
            mrp: 0,
            sellingPrice: 0,
            discountPercentage: 0,
            media: [],
            isDefault: false
        },
    });


    useEffect(() => {
        if (productVariantData && !productVariantLoading) {
            const productVariantDetails = productVariantData.data.productVariantDetails as TypeOfProductVariantData
            form.reset({
                _id: productVariantDetails._id,
                productId: productVariantDetails.productId,
                sku: productVariantDetails.sku,
                size: productVariantDetails.size,
                color: productVariantDetails.color,
                material: productVariantDetails.material,
                mrp: productVariantDetails.mrp,
                sellingPrice: productVariantDetails.sellingPrice,
                stock: productVariantDetails.stock,
                discountPercentage: productVariantDetails.discountPercentage,
                media: productVariantDetails.media.map((m: any) => m._id),
                isDefault: productVariantDetails.isDefault
            })
            setSelectedMedia(productVariantDetails.media);
        }
    }, [productVariantData]);

    useEffect(() => {
        const mrp = form.watch("mrp");
        const sellingPrice = form.watch("sellingPrice");
        if (mrp > 0 || sellingPrice > 0) {
            const discountPercentage = Math.floor(((mrp - sellingPrice) / mrp) * 100);
            form.setValue("discountPercentage", discountPercentage);
        }
    }, [form.watch("mrp"), form.watch("sellingPrice")]);

    useEffect(() => {
        if (selectedMedia && selectedMedia.length > 0) {
            const mediaIds = selectedMedia.map((mediaItem) => mediaItem._id);
            form.setValue("media", mediaIds);
        }
    }, [selectedMedia]);


    async function onSubmit(data: TypeOfEditProductVarinatInput) {
        const result = await updateProductVariantService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        setSelectedMedia([]);
        toast.success(result.message);
        return router.push(adminRoutes.productVariants.productVariants);
    }

    return (
        <div className="space-y-2">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Edit Product Variant
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.productVariants.productVariants}>
                                Back to Product Variants
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        {
                            productLoading || productVariantLoading ? (
                                <AddProductVariantSkeleton />
                            ) : (
                                <Form {...form} key={form.watch("_id") || "Edit Product Variant"}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-3"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2  gap-3">

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="productId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Product <span className="text-red-600">*</span> </FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                            >
                                                                <FormControl className="w-full">
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a Product" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {productList &&
                                                                        productList.length > 0 &&
                                                                        productList?.map((item: any) => (
                                                                            <SelectItem
                                                                                key={item._id}
                                                                                value={item._id}
                                                                            >
                                                                                {item.title}
                                                                            </SelectItem>
                                                                        ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="sku"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Sku <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter the Sku"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="size"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Size <span className="text-red-600">*</span> </FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                            >
                                                                <FormControl className="w-full">
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Size" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {sizeData.map((item: any) => (
                                                                        <SelectItem
                                                                            key={item.label}
                                                                            value={item.value}
                                                                        >
                                                                            {item.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="color"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Color <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter the color"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="material"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Material <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter the material"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="stock"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Stock</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter the Stock"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="mrp"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>MRP <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Enter the MRP"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="sellingPrice"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Selling Price <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Enter the Selling Price"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="discountPercentage"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Discount Percentage <span className="text-red-600">*</span> </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    readOnly
                                                                    type="number"
                                                                    placeholder="Enter the Discount Percentage"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="isDefault"
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <div className="space-y-0.5">
                                                                <FormLabel>Default Variant </FormLabel>
                                                            </div>
                                                            <div className="flex flex-row items-center justify-between rounded-lg border p-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                            </div>

                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <SelectMediaModel
                                                selectedMedia={selectedMedia}
                                                setSelectedMedia={setSelectedMedia}
                                                setOpenSelectMediaModel={setOpenSelectMediaModel}
                                                openSelectMediaModel={openSelectMediaModel}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="media"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col justify-center items-center">
                                                        <FormLabel>Media <span className="text-red-600">*</span> </FormLabel>
                                                        <FormControl>
                                                            <Button
                                                                type="button"
                                                                onClick={() => setOpenSelectMediaModel(true)}
                                                                className="w-full md:min-w-md"
                                                                variant={"outline"}
                                                            >
                                                                Choese Media
                                                            </Button>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex gap-2 justify-center mt-4 flex-wrap">
                                                {
                                                    selectedMedia && selectedMedia.length > 0 && selectedMedia.map((mediaItem, index) =>
                                                        < div key={index} className="h-20 relative rounded overflow-hidden">
                                                            <Image
                                                                src={mediaItem.secure_url}
                                                                alt={mediaItem.alt || "Media Image"}
                                                                className="object-cover w-full h-full"
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>


                                        <ButtonLoading
                                            type="submit"
                                            loading={form.formState.isSubmitting}
                                            text={"Update Product Variant"}
                                        />
                                    </form>
                                </Form>
                            )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditProductVariantPage;
