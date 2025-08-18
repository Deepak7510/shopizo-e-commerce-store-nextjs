"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminRoutes } from '@/lib/client/routes';
import React, { use, useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { updateSubcategoryService } from '@/services/client/subcategories/updateSubcategoryService';
import { TypeOfEditSubcategoryInput } from '@/types/admin.subcategories.types';
import { editSubcategoryZodSchema } from '@/zodSchema/admin.subcategories.schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TypeOfCategoryData } from '@/types/admin.category.types';
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
    const { data: SubcategoryDetails, loading, error } = useFetch(`/api/admin/subcategories/details/${id}`, {}, [id]);

    const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch(
        `/api/admin/categories/fetch-all`,
        {},
        []
    );
    const categoryList = categoryData?.data.allDataList as TypeOfCategoryData[]

    const form = useForm<TypeOfEditSubcategoryInput>({
        resolver: zodResolver(editSubcategoryZodSchema),
        defaultValues: {
            _id: "",
            name: "",
            slug: "",
            category: ""
        }
    })

    const categoryName = form.watch("name");
    useEffect(() => {
        const slugValue = slugify(categoryName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [categoryName]);

    useEffect(() => {
        if (SubcategoryDetails && !loading) {
            form.reset({
                _id: SubcategoryDetails.data.subcategoryDetails._id || "",
                name: SubcategoryDetails.data.subcategoryDetails.name || "",
                slug: SubcategoryDetails.data.subcategoryDetails.slug || "",
                category: SubcategoryDetails.data.subcategoryDetails.category || "",
            })
        }
    }, [SubcategoryDetails]);


    async function onSubmit(data: TypeOfEditSubcategoryInput) {
        const result = await updateSubcategoryService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
        router.push(adminRoutes.subcategories.subcategories);
        return
    }

    if (error) {
        return <div className='text-xl text-red-700 font-medium'>{error.message}</div>
    }

    if (categoryError) {
        return <div className='text-xl text-red-700 font-medium'>{categoryError.message}</div>
    }

    return (<div className='space-y-3'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <div className='rounded-md border p-3'>
            <div className="flex justify-between mb-1">
                <h1 className="text-xl text-violet-700 font-semibold">
                    Edit Subcategory
                </h1>
                <div className="flex items-center gap-2">

                    <Button asChild size={"sm"}>
                        <Link href={adminRoutes.subcategories.subcategories}>
                            Back to Subcategories
                        </Link>
                    </Button>
                </div>
            </div>
            <Separator className='mb-2' />
            <Card className="rounded-sm shadow-none py-3">
                <CardContent>
                    {loading || categoryLoading ?
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
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[60px]" />
                                    <Skeleton className="h-10 w-full rounded" />
                                </div>
                                <Skeleton className="h-9 w-[150px] rounded" />
                            </div>
                        </div>
                        :
                        <Form {...form} key={form.watch("_id") || "edit-subcategory-form"}>
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
                                                <FormControl className="w-full" >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categoryLoading ? (
                                                        <div className="text-sm">Loading...</div>
                                                    ) : (
                                                        categoryList &&
                                                        categoryList.length > 0 &&
                                                        categoryList.map(
                                                            (item: TypeOfCategoryData) => (
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
                                    text={"Update Subcategory"}
                                />
                            </form>
                        </Form>
                    }
                </CardContent>
            </Card>
        </div>
    </div >
    )
}

export default EditCategoryPage
