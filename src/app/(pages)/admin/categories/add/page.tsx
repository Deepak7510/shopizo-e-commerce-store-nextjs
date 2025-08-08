"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminRoutes } from '@/lib/client/routes';
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { addCategoryZodSchema } from '@/zodSchema/admin.category.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypesOfAddCategoryInput } from '@/types/admin.category.types';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { createCategoryService } from '@/services/client/category/createCategoryService';
import { toast } from 'sonner';
const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home"
    },
    {
        href: adminRoutes.categories.categories,
        title: "Categories"
    },
    {
        href: "",
        title: "Add Category"
    }
]

const AddCategoryPage = () => {

    const form = useForm<TypesOfAddCategoryInput>({
        resolver: zodResolver(addCategoryZodSchema),
        defaultValues: {
            name: "",
            slug: ""
        }
    })
    const categoryName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(categoryName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [categoryName])

    async function onSubmit(data: TypesOfAddCategoryInput) {
        const result = await createCategoryService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
    }

    return (<div className='space-y-2'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <Card className="rounded-sm shadow-none py-3 gap-2.5">
            <CardHeader>
                <div className="flex justify-between">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Add Category
                    </h1>
                    <div className="flex items-center gap-2">

                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.categories.categories}>
                                Back to Categories
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1/4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the category name" {...field} />
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
                                                <Input readOnly placeholder="Enter the slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <ButtonLoading
                                    type="submit"
                                    loading={form.formState.isSubmitting}
                                    text={"Save Category"}
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    </div>
    )
}

export default AddCategoryPage
