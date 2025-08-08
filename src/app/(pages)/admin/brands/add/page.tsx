"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminRoutes } from '@/lib/client/routes';
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import Link from 'next/link';
import slugify from 'slugify'
import { toast } from 'sonner';
import { TypesOfAddBrandInput } from '@/types/admin.brands.types';
import { addBrandZodSchema } from '@/zodSchema/admin.brands.schema';
import { createBrandService } from '@/services/client/brands/crateBrandService';
const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home"
    },
    {
        href: adminRoutes.brands.brands,
        title: "Brands"
    },
    {
        href: "",
        title: "Add Brand"
    }
]

const AddBrandsPage = () => {

    const form = useForm<TypesOfAddBrandInput>({
        resolver: zodResolver(addBrandZodSchema),
        defaultValues: {
            name: "",
            slug: ""
        }
    })
    const brandName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(brandName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [brandName])

    async function onSubmit(data: TypesOfAddBrandInput) {
        const result = await createBrandService(data);
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
                        Add Brand
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1/4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the brand name" {...field} />
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
                                    text={"Save Brand"}
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

export default AddBrandsPage
