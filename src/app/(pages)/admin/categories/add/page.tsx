"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminRoutes } from '@/lib/client/routes';
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { addCategoryZodSchema } from '@/zodSchema/admin.category.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOfAddCategoryInput } from '@/types/admin.category.types';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import { createCategoryService } from '@/services/client/categories/createCategoryService';
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

    const form = useForm<TypeOfAddCategoryInput>({
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

    async function onSubmit(data: TypeOfAddCategoryInput) {
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
        <div className='border rounded-md p-3'>
            <div className="flex justify-between mb-1">
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
            <Separator className='mb-2' />
            <Card className="rounded-sm shadow-none py-3">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1/4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name <span className="text-red-600">*</span></FormLabel>
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
                                        <FormLabel>Slug <span className="text-red-600">*</span></FormLabel>
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
        </div>
    </div>
    )
}

export default AddCategoryPage
