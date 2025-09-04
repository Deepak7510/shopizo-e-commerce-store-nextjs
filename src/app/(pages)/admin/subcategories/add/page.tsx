"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { TypeOfAddSubcategoryInput } from "@/types/admin.subcategories.types";
import { addSubcategoryZodSchema } from "@/zodSchema/admin.subcategories.schema";
import { createSubcategoryService } from "@/services/client/admin/subcategories/createSubcategoryService";
import { Textarea } from "@/components/ui/textarea";

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

    const form = useForm<TypeOfAddSubcategoryInput>({
        resolver: zodResolver(addSubcategoryZodSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: ""
        },
    });
    const categoryName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(categoryName.toLowerCase());
        form.setValue("slug", slugValue);
    }, [categoryName, form]);

    async function onSubmit(data: TypeOfAddSubcategoryInput) {
        const result = await createSubcategoryService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        toast.success(result.message);
    }

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Add Subcategory
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.subcategories.subcategories}>
                                Show Subcategories
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />

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
                                            <FormLabel>Subcategory Name <span className="text-red-600">*</span></FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Write the description"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>

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
            </Card>
        </div >
    );
};

export default AddSubcategoryPage;
