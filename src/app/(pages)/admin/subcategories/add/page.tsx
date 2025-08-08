"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { useEffect } from "react";
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
import { toast } from "sonner";
import { TypesOfAddSubcategoryInput } from "@/types/admin.subcategories.types";
import { addSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema";
import { createSubcategoryService } from "@/services/client/subcategories/createSubcategoryService";
import useFetch from "@/hooks/useFetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TypesOfCategoryData } from "@/types/admin.category.types";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: adminRoutes.subcategories.subcategories,
        title: "Subcategories",
    },
    {
        href: "",
        title: "Add Subcategory",
    },
];

const AddSubcategoryPage = () => {
    const { data, loading, error } = useFetch(
        `/api/admin/categories/fetch-all`,
        {},
        []
    );

    const form = useForm<TypesOfAddSubcategoryInput>({
        resolver: zodResolver(addSubcategoryZodSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: "",
        },
    });
    const categoryName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(categoryName.toLowerCase());
        form.setValue("slug", slugValue);
    }, [categoryName]);

    async function onSubmit(data: TypesOfAddSubcategoryInput) {
        const result = await createSubcategoryService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        toast.success(result.message);
    }

    if (error) {
        return <div className='text-xl text-red-700 font-medium'>{error.message}</div>
    }

    return (
        <div className="space-y-2">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-sm shadow-none py-3 gap-2.5">
                <CardHeader>
                    <div className="flex justify-between">
                        <h1 className="text-xl text-violet-700 font-semibold">
                            Add Subcategory
                        </h1>
                        <div className="flex items-center gap-2">
                            <Button asChild size={"sm"}>
                                <Link href={adminRoutes.subcategories.subcategories}>
                                    Back to Subcategories
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Card className="rounded-sm shadow-none py-3">
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-3 flex-1/4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subcategory Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter the subcategory name"
                                                        {...field}
                                                    />
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
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="w-full" >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {loading ? (
                                                            <div className="text-sm">Loading...</div>
                                                        ) : (
                                                            data &&
                                                            data.data &&
                                                            data.data?.allDataList?.map(
                                                                (item: TypesOfCategoryData) => (
                                                                    <SelectItem key={item._id} value={item._id}>
                                                                        {item.name}
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <ButtonLoading
                                        type="submit"
                                        loading={form.formState.isSubmitting}
                                        text={"Save Subcategory"}
                                    />
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddSubcategoryPage;
