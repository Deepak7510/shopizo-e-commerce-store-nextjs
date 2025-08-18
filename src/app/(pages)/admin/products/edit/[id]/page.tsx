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

import AddProductSkeleton from "@/components/application/admin/AddProductSkeleton";
import { toast } from "sonner";
import { mediaType } from "@/types/admin.media.types";
import SelectMediaModel from "@/components/application/admin/SelectMediaModel";
import Image from "next/image";
import { TypeOfEditProductInput } from "@/types/admin.products.types";
import { useRouter } from "next/navigation";
import { updateProductService } from "@/services/client/products/updateProductService";

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
    const router = useRouter()
    const { id } = use(params)
    const [openSelectMediaModel, setOpenSelectMediaModel] =
        useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<mediaType[]>([]);

    const {
        data: brandData,
        loading: brandLoading,
        error: brandError,
    } = useFetch(`/api/admin/brands/fetch-all`, {}, []);
    const {
        data: categoryData,
        loading: categoryLoading,
        error: categoryError,
    } = useFetch(`/api/admin/categories/fetch-all`, {}, []);
    const {
        data: subcategoryData,
        loading: subcategoryLoading,
        error: subcategoryError,
    } = useFetch(`/api/admin/subcategories/fetch-all`, {}, []);

    const {
        data: productData,
        loading: productDataLoading,
        error: productDataError,
    } = useFetch(`/api/admin/products/details/${id}`, {}, [id]);

    if (brandError || categoryError || subcategoryError || productDataError) {
        return (
            <div className="text-xl text-red-700 font-medium">
                {brandError?.message ||
                    categoryError?.message ||
                    subcategoryError?.message ||
                    productDataError?.message ||
                    "Something went worng."}
            </div>
        );
    }

    const brandList = brandData?.data?.allDataList as TypeOfBrandData[];
    const categoryList = categoryData?.data?.allDataList as TypeOfCategoryData[];
    const subcategoryList = subcategoryData?.data
        ?.allDataList as TypeOfSubcategoryData[];
    const productDetails = productData?.data?.productDetails;

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


    useEffect(() => {
        if (productDetails && !productDataLoading) {
            form.reset({
                _id: productDetails._id || "",
                title: productDetails.title || "",
                slug: productDetails.slug || "",
                category: productDetails.category || "",
                subcategory: productDetails.subcategory || "",
                media: productDetails?.media?.map((m: any) => m._id) || [],
                brand: productDetails.brand || "",
                description: productDetails.description || "",
            })
            setSelectedMedia(productDetails.media)
        }

    }, [productDetails])

    useEffect(() => {
        const title = form.watch("title");
        const slugValue = slugify(title.toLowerCase());
        form.setValue("slug", slugValue);
    }, [form.watch("title")]);

    useEffect(() => {
        if (selectedMedia && selectedMedia.length > 0) {
            const mediaIds = selectedMedia.map((mediaItem) => mediaItem._id);
            form.setValue("media", mediaIds);
        }
    }, [selectedMedia]);

    async function onSubmit(data: TypeOfEditProductInput) {
        console.log(data);
        const result = await updateProductService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        setSelectedMedia([]);
        toast.success(result.message);
        return router.push(adminRoutes.products.products)
    }

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Edit Product
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.products.products}>
                                Back to Products
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />

                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        {categoryLoading ||
                            brandLoading ||
                            subcategoryLoading ||
                            productDataLoading ? (
                            <AddProductSkeleton />
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
                                                        <FormLabel>Title <span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter the Title"
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
                                                name="slug"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Slug <span className="text-red-600">*</span></FormLabel>
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
                                                        <FormLabel>Brand <span className="text-red-600">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {brandList &&
                                                                    brandList.length > 0 &&
                                                                    brandList?.map((item: TypeOfBrandData) => (
                                                                        <SelectItem
                                                                            key={item._id}
                                                                            value={item._id}
                                                                        >
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
                                                        <FormLabel>Category <span className="text-red-600">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {categoryList &&
                                                                    categoryList.length > 0 &&
                                                                    categoryList?.map(
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
                                                        <FormLabel>Subcategory <span className="text-red-600">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {subcategoryList &&
                                                                    subcategoryList.length > 0 &&
                                                                    subcategoryList?.map(
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
                                                        <FormLabel>Description <span className="text-red-600">*</span></FormLabel>
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
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col justify-center items-center">
                                                        <FormLabel>Media <span className="text-red-600">*</span></FormLabel>
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
            </div>
        </div>
    );
};

export default EditProductPage;

