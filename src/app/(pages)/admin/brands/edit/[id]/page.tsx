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
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import useFetch from '@/hooks/useFetch';
import EditCategorySkeleton from '@/components/application/admin/EditCategorySkeleton';
import { useRouter } from 'next/navigation';
import { editBrandZodSchema } from '@/zodSchema/admin.brands.schema';
import { TypesOfEditBrandInput } from '@/types/admin.brands.types';
import { updateBrandService } from '@/services/client/brands/updateBrandService';
const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home"
    },
    {
        href: adminRoutes.categories.categories,
        title: "Brands"
    },
    {
        href: "",
        title: "Edit Brand"
    }
]

const EditCategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter()
    const { data, loading, error } = useFetch(`/api/admin/brands/details/${id}`, {}, [id]);

    useEffect(() => {
        if (data && !loading) {
            form.reset({
                _id: data.data.brandDetails._id || "",
                name: data.data.brandDetails.name || "",
                slug: data.data.brandDetails.slug || "",
            })
        }
    }, [data])

    const form = useForm<TypesOfEditBrandInput>({
        resolver: zodResolver(editBrandZodSchema),
        defaultValues: {
            _id: "",
            name: "",
            slug: ""
        }
    })
    const brandName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(brandName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [brandName])

    async function onSubmit(data: TypesOfEditBrandInput) {
        const result = await updateBrandService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
        return router.push(adminRoutes.brands.brands);
    }

    if (error) {
        return <div className='text-base text-red-700 font-medium'>{error.message}</div>
    }

    return (<div className='space-y-3'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <Card className="rounded-sm shadow-none py-3 gap-2.5">
            <CardHeader>
                <div className="flex justify-between">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Edit Brand
                    </h1>
                    <div className="flex items-center gap-2">

                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.brands.brands}>
                                Back to Brands
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
                                                <FormLabel>Brand Name</FormLabel>
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
                                        text={"Update Brand"}
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
