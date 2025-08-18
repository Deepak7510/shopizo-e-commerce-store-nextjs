"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminRoutes } from '@/lib/client/routes';
import React, { use, useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOfCategoryData, TypeOfEditCategoryInput } from '@/types/admin.category.types';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import useFetch from '@/hooks/useFetch';
import { editCatgeoryZodSchema } from '@/zodSchema/admin.category.schema';
import { useRouter } from 'next/navigation';
import { updateCategoryService } from '@/services/client/categories/updateCategoryService';
import { Skeleton } from '@/components/ui/skeleton';

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
        title: "Edit Category"
    }
]

const EditCategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter()
    const { data: categoryData, loading, error } = useFetch(`/api/admin/categories/details/${id}`, {}, [id]);
    const categoryDetails = categoryData?.data.categoryDetails as TypeOfCategoryData

    useEffect(() => {
        if (categoryData && !loading) {
            form.reset({
                _id: categoryDetails._id || "",
                name: categoryDetails.name || "",
                slug: categoryDetails.slug || "",
            })
        }
    }, [categoryData])

    const form = useForm<TypeOfEditCategoryInput>({
        resolver: zodResolver(editCatgeoryZodSchema),
        defaultValues: {
            _id: "",
            name: "",
            slug: ""
        }
    })
    const categoryName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(categoryName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [categoryName])

    async function onSubmit(data: TypeOfEditCategoryInput) {
        const result = await updateCategoryService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
        return router.push(adminRoutes.categories.categories);
    }

    if (error) {
        return <div className='text-xl text-red-700 font-medium'>{error.message}</div>
    }

    return (<div className='space-y-3'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <div className='border rounded-md p-3'>
            <div className="flex justify-between mb-1">
                <h1 className="text-xl text-violet-700 font-semibold">
                    Edit Category
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
                    {loading ?
                        <div className="w-full">
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[60px]" />
                                    <Skeleton className="h-10 w-full rounded" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[60px]" />
                                    <Skeleton className="h-10 w-full rounded" />
                                </div>
                                <Skeleton className="h-9 w-[150px] rounded" />
                            </div>
                        </div>
                        :
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
                                    text={"Update Category"}
                                />
                            </form>
                        </Form>
                    }
                </CardContent>
            </Card>
        </div>
    </div>
    )
}

export default EditCategoryPage
