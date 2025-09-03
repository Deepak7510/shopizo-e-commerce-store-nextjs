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
import slugify from "slugify";
import useFetch from "@/hooks/useFetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { editProductZodSchema } from "@/zodSchema/admin.products.schema";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { TypeOfBrandData } from "@/types/admin.brands.types";
import { TypeOfCategoryData } from "@/types/admin.category.types";
import { TypeOfSubcategoryData } from "@/types/admin.subcategories.types";
import { toast } from "sonner";
import { mediaType } from "@/types/admin.media.types";
import SelectMediaModel from "@/components/application/admin/SelectMediaModel";
import Image from "next/image";
import { TypeOfEditProductInput } from "@/types/admin.products.types";
import { useRouter } from "next/navigation";
import { updateProductService } from "@/services/client/admin/products/updateProductService";
import axiosInstance from "@/lib/client/axios";
import ProductFormSkeleton from "@/components/application/admin/ProductFormSkeleton";

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
        title: "Edit Product",
    },
];

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { id } = use(params);
    const [openSelectMediaModel, setOpenSelectMediaModel] =
        useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<mediaType[]>([]);
    const [subcategories, setSubcategories] = useState<
        TypeOfSubcategoryData[] | []
    >([]);

    const form = useForm<TypeOfEditProductInput>({
        resolver: zodResolver(editProductZodSchema),
        defaultValues: {
            _id: "",
            title: "",
            slug: "",
            brand: "",
            category: "",
            subcategory: "",
            media: [],
            description: "",
        },
    });

    const mrp = form.watch("mrp");
    const sellingPrice = form.watch("sellingPrice");
    const discountPercentage = form.watch("discountPercentage");
    const title = form.watch("title");

    useEffect(() => {
        const slugValue = slugify(title.toLowerCase());
        form.setValue("slug", slugValue);
    }, [title, form]);

    useEffect(() => {
        form.setValue("discountPercentage", discountPercentage && Number(discountPercentage))
        form.setValue("mrp", mrp && Number(mrp))
        form.setValue("sellingPrice", sellingPrice && Number(sellingPrice))
    }, [discountPercentage, mrp, sellingPrice, form]);

    useEffect(() => {
        if (selectedMedia && selectedMedia.length > 0) {
            const mediaIds = selectedMedia.map((mediaItem) => mediaItem._id);
            form.setValue("media", mediaIds);
        }
    }, [selectedMedia, form]);


    const {
        data: brandData,
        loading: brandLoading,
        error: brandError,
    } = useFetch(`/api/admin/brands/get-all`, {}, []);
    const {
        data: categoryData,
        loading: categoryLoading,
        error: categoryError,
    } = useFetch(`/api/admin/categories/get-all`, {}, []);

    const {
        data: productData,
        loading: productDataLoading,
        error: productDataError,
    } = useFetch(`/api/admin/products/details/${id}`, {}, [id]);

    const brands = brandData?.data?.brands as TypeOfBrandData[];
    const categories = categoryData?.data?.categories as TypeOfCategoryData[];

    const watchedCategory = form.watch("category");
    useEffect(() => {
        if (watchedCategory) {
            async function fetchSubcategories() {
                try {
                    const response = await axiosInstance.get(
                        `/api/admin/subcategories/get/${watchedCategory}`
                    );
                    const subcategories = response.data.data.subcategories;
                    setSubcategories(subcategories);
                } catch (error: any) {
                    console.error(error);
                }
            }
            fetchSubcategories();
        }
    }, [watchedCategory]);

    useEffect(() => {
        if (productData?.data?.product) {
            const product = productData?.data?.product;
            form.reset({
                _id: product._id || "",
                title: product.title || "",
                slug: product.slug || "",
                category: product.category || "",
                subcategory: product.subcategory || "",
                media: product?.media?.map((m: any) => m._id) || [],
                brand: product.brand || "",
                description: product.description || "",
            });
            setSelectedMedia(product.media);
        }
    }, [productData, form]);


    async function onSubmit(data: TypeOfEditProductInput) {
        const result = await updateProductService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        setSelectedMedia([]);
        toast.success(result.message);
        return router.push(adminRoutes.products.products);
    }

    if (brandError || categoryError || productDataError) {
        return (
            <div className="text-xl text-red-700 font-medium">
                {brandError?.message ||
                    categoryError?.message ||
                    productDataError?.message ||
                    "Something went wrong."}
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Edit Product
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.products.products}>Show Products</Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />

                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        {categoryLoading || brandLoading || productDataLoading ? (
                            <ProductFormSkeleton />
                        ) : (
                            <Form {...form} key={form.watch("_id") || "Edit Product"}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-3"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Title <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter the title" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="slug"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Slug <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                readOnly
                                                                placeholder="Enter the slug"
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
                                                name="brand"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Brand <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a brand" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {brands &&
                                                                    brands.length > 0 &&
                                                                    brands?.map((item: TypeOfBrandData) => (
                                                                        <SelectItem key={item._id} value={item._id}>
                                                                            {item.name}
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
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Category <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {categories &&
                                                                    categories.length > 0 &&
                                                                    categories?.map(
                                                                        (item: TypeOfCategoryData) => (
                                                                            <SelectItem
                                                                                key={item._id}
                                                                                value={item._id}
                                                                            >
                                                                                {item.name}
                                                                            </SelectItem>
                                                                        )
                                                                    )}
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
                                                name="subcategory"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Subcategory{" "}
                                                            <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a subcategory" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {subcategories &&
                                                                    subcategories.length > 0 &&
                                                                    subcategories?.map(
                                                                        (item: TypeOfSubcategoryData) => (
                                                                            <SelectItem
                                                                                key={item._id}
                                                                                value={item._id}
                                                                            >
                                                                                {item.name}
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Description{" "}
                                                            <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div>
                                                                <ReactQuill
                                                                    className="w-full"
                                                                    theme="snow"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
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
                                                render={() => (
                                                    <FormItem className="flex flex-col justify-center items-center">
                                                        <FormLabel>
                                                            Media <span className="text-red-600">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Button
                                                                type="button"
                                                                onClick={() => setOpenSelectMediaModel(true)}
                                                                className="w-full md:min-w-md"
                                                                variant={"outline"}
                                                            >
                                                                Choose Media
                                                            </Button>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex gap-2 justify-center mt-4 flex-wrap">
                                                {selectedMedia &&
                                                    selectedMedia.length > 0 &&
                                                    selectedMedia.map((mediaItem, index) => (
                                                        <div
                                                            key={index}
                                                            className="h-20 relative rounded overflow-hidden"
                                                        >
                                                            <Image
                                                                src={mediaItem.secure_url}
                                                                alt={mediaItem.alt || "Selected media image"}
                                                                className="object-cover"
                                                                fill
                                                                unoptimized
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                    <ButtonLoading
                                        type="submit"
                                        loading={form.formState.isSubmitting}
                                        text={"Update Product"}
                                    />
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </Card>
        </div>
    );
};

export default EditProductPage;
