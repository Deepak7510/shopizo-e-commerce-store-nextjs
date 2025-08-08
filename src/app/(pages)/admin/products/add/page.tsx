"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { useEffect, useState } from "react";
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
import { addProductZodSchema } from "@/zodSchema/admin.products.schema";
import { TypesOfAddProductInput } from "@/types/admin.products.types";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { TypesOfBrandData } from "@/types/admin.brands.types";
import { TypesOfCategoryData } from "@/types/admin.category.types";
import { TypesOfSubcategoryData } from "@/types/admin.subcategories.types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMediaService } from "@/services/client/media/fetchMediaService";
import Image from "next/image";
import { Check } from "lucide-react";


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
        title: "Add Product",
    },
];

const AddProductPage = () => {
    const {
        data: brandList,
        loading: brandLoading,
        error: brandError,
    } = useFetch(`/api/admin/brands/fetch-all`, {}, []);
    const {
        data: catgeoryList,
        loading: categoryLoading,
        error: categoryError,
    } = useFetch(`/api/admin/categories/fetch-all`, {}, []);
    const {
        data: subcategoryList,
        loading: subcategoryLoading,
        error: subcategoryError,
    } = useFetch(`/api/admin/subcategories/fetch-all`, {}, []);


    const [mediaList, setMediaList] = useState([]);



    const form = useForm<TypesOfAddProductInput>({
        resolver: zodResolver(addProductZodSchema),
        defaultValues: {
            title: "",
            slug: "",
            brand: "",
            category: "",
            subcategory: "",
            mrp: 0,
            sellingPrice: 0,
            discountPercentage: 0,
            media: [],
            description: "",
        },
    });
    const title = form.watch("title");

    useEffect(() => {
        const slugValue = slugify(title.toLowerCase());
        form.setValue("slug", slugValue);
    }, [title]);

    async function onSubmit(data: TypesOfAddProductInput) {
        // const result = await createSubcategoryService(data);
        // if (!result.success) {
        //     toast.error(result.message);
        //     return;
        // }
        // form.reset();
        // toast.success(result.message);
    }



    if (brandError || categoryError || subcategoryError) {
        return <div className='text-xl text-red-700 font-medium'>{brandError?.message || categoryError?.message || subcategoryError?.message || "Something went worng."}</div>
    }



    const [openSelectMediaDialog, setOpenSelectMediaDialog] = useState<boolean>(false);

    const { data, fetchNextPage, hasNextPage, isFetching, status } =
        useInfiniteQuery({
            queryKey: ["medias"],
            queryFn: async ({ pageParam = 1 }) =>
                await fetchMediaService(pageParam, "SD"),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.hasMore ? allPages.length : undefined;
            },
        });

    const allMediaList = data?.pages
        ?.flatMap((group) => group.data.mediaList)
        .filter((item) => item.secure_url);


    console.log(allMediaList)


    function handleSelectMedia() {
        setOpenSelectMediaDialog(true);
    }
    return (
        <div className="space-y-2">
            <Dialog open={openSelectMediaDialog} onOpenChange={setOpenSelectMediaDialog}  >
                <DialogContent className="min-w-full md:min-w-[1200px] h-screen overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Choese Media</DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <div className="grid grid-cols-5 gap-2">
                            {allMediaList?.map((media) => {
                                return <div key={media._id} className="border space-y-2">
                                    <div className="h-64 relative">
                                        <Image
                                            src={media.secure_url}
                                            alt={media.alt || "Media Image"}
                                            className="object-cover w-full h-full rounded"
                                            width={300}
                                            height={300}
                                        />
                                        <div className="w-full h-full flex justify-center items-center top-0 absolute bg-gray-800 opacity-50">
                                            <Check className="text-white w-10 h-10" />
                                        </div>
                                    </div>
                                    <h1>{media.title}</h1>
                                </div>
                            })}

                        </div>
                    </div>
                    <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load More</Button>
                </DialogContent>
            </Dialog>
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-sm shadow-none py-3 gap-2.5">
                <CardHeader>
                    <div className="flex justify-between">
                        <h1 className="text-xl text-violet-700 font-semibold">
                            Add Product
                        </h1>
                        <div className="flex items-center gap-2">
                            <Button asChild size={"sm"}>
                                <Link href={adminRoutes.subcategories.subcategories}>
                                    Back to Products
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Card className="rounded-sm shadow-none py-3">
                        <CardContent>
                            {(categoryLoading || brandLoading || subcategoryLoading) ?
                                <div>Loading...</div> :
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-3"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter the Title" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="slug"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Slug</FormLabel>
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

                                            <FormField
                                                control={form.control}
                                                name="brand"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Brand</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {brandList &&
                                                                    brandList.data &&
                                                                    brandList.data?.allDataList?.map(
                                                                        (item: TypesOfBrandData) => (
                                                                            <SelectItem key={item._id} value={item._id}>
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
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {catgeoryList &&
                                                                    catgeoryList.data &&
                                                                    catgeoryList.data?.allDataList?.map(
                                                                        (item: TypesOfCategoryData) => (
                                                                            <SelectItem key={item._id} value={item._id}>
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
                                            <FormField
                                                control={form.control}
                                                name="subcategory"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Subcategory</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl className="w-full">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {subcategoryList &&
                                                                    subcategoryList.data &&
                                                                    subcategoryList.data?.allDataList?.map(
                                                                        (item: TypesOfSubcategoryData) => (
                                                                            <SelectItem key={item._id} value={item._id}>
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


                                            <FormField
                                                control={form.control}
                                                name="mrp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>MRP</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Enter the MRP" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="sellingPrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Selling Price</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Enter the Selling Price" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="discountPercentage"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Discount Percentage</FormLabel>
                                                        <FormControl>
                                                            <Input readOnly type="number" placeholder="Enter the Discount Percentage" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem className="col-span-2">
                                                        <FormLabel>Discount Percentage</FormLabel>
                                                        <FormControl>
                                                            <div>
                                                                <ReactQuill className="w-full" theme="snow" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="media"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Media</FormLabel>
                                                        <FormControl>
                                                            <Button type="button" onClick={handleSelectMedia} variant={"outline"}>Choese Media</Button>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <ButtonLoading
                                            type="submit"
                                            loading={form.formState.isSubmitting}
                                            text={"Save Product"}
                                        />
                                    </form>
                                </Form>


                            }

                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductPage;
