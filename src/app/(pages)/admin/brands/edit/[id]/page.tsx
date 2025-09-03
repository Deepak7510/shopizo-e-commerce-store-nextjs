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
import { editBrandZodSchema } from '@/zodSchema/admin.brands.schema';
import { TypeOfBrandData, TypeOfEditBrandInput } from '@/types/admin.brands.types';
import { updateBrandService } from '@/services/client/admin/brands/updateBrandService';
import { Textarea } from '@/components/ui/textarea';
import BrandFormSkeleton from '@/components/application/admin/BrandFormSkeleton';
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

const EditBrandPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const paramsValue = use(params);
    const id = paramsValue.id;
    const router = useRouter()
    const form = useForm<TypeOfEditBrandInput>({
        resolver: zodResolver(editBrandZodSchema),
        defaultValues: {
            _id: "",
            name: "",
            slug: "",
            description: "",
            website: ""
        }
    })

    const brandName = form.watch("name");
    useEffect(() => {
        const slugValue = slugify(brandName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [brandName, form]);

    const { data, loading } = useFetch(`/api/admin/brands/details/${id}`, {}, [id]);

    useEffect(() => {
        if (data?.data?.brand) {
            const brand = data?.data?.brand as TypeOfBrandData
            form.reset({
                _id: brand._id || "",
                name: brand.name || "",
                slug: brand.slug || "",
                description: brand.description || "",
                website: brand.website || "",
            })
        }
    }, [data, form])

    async function onSubmit(data: TypeOfEditBrandInput) {
        const result = await updateBrandService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
        return router.push(adminRoutes.brands.brands);
    }

    return (<div className='space-y-3'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <Card className="rounded-md p-3 gap-0 shadow-none">
            <div className="flex justify-between mb-1">
                <h1 className="text-xl text-violet-700 font-semibold"> Edit Brand</h1>
                <Button asChild size={"sm"}>
                    <Link href={adminRoutes.brands.brands}>Show Brands</Link>
                </Button>
            </div>
            <Separator className="mb-2" />
            <Card className="rounded-sm shadow-none py-3">
                <CardContent>
                    {loading ?
                        <BrandFormSkeleton />
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1/4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand Name <span className="text-red-600">*</span></FormLabel>
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
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the website url"
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
                                    text={"Update Brand"}
                                />
                            </form>
                        </Form>
                    }
                </CardContent>
            </Card>
        </Card>
    </div >
    )
}

export default EditBrandPage
