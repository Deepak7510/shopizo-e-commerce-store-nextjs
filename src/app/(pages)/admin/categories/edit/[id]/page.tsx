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
import { TypesOfEditCategoryInput } from '@/types/admin.category.types';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import useFetch from '@/hooks/useFetch';
import { editCatgeoryZodSchema } from '@/zodSchema/admin.category.schema';
import EditCategorySkeleton from '@/components/application/admin/EditCategorySkeleton';
import { updateCategoryService } from '@/services/client/category/updateCategoryService';
import { useRouter } from 'next/navigation';
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

    const { data, loading, error } = useFetch(`/api/admin/categories/details/${id}`, {}, [id]);

    useEffect(() => {
        if (data && !loading) {
            form.reset({
                _id: data.data.categoryDetails._id || "",
                name: data.data.categoryDetails.name || "",
                slug: data.data.categoryDetails.slug || "",
            })
        }
    }, [data])

    const form = useForm<TypesOfEditCategoryInput>({
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

    async function onSubmit(data: TypesOfEditCategoryInput) {
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
        <Card className="rounded-sm shadow-none py-3 gap-2.5">
            <CardHeader>
                <div className="flex justify-between">
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
                <Separator />

            </CardHeader>
            <CardContent>
                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        {loading ?
                            <EditCategorySkeleton />
                            :
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
                                        text={"Update Category"}
                                    />
                                </form>
                            </Form>
                        }
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    </div>
    )
}

export default EditCategoryPage
