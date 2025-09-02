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
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { TypeOfColorData, TypeOfEditColorInput } from '@/types/admin.colors.types';
import { editColorZodSchema } from '@/zodSchema/admin.color.schema';
import { updateColorService } from '@/services/client/admin/colors/updateColorService';
const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home"
    },
    {
        href: adminRoutes.categories.categories,
        title: "Colors"
    },
    {
        href: "",
        title: "Edit Color"
    }
]

const EditColorPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter()
    const paramsValue = use(params);
    const id = paramsValue.id;
    const { data, error, loading } = useFetch(`/api/admin/colors/details/${id}`, {}, [id]);

    if (error) {
        return <div className='text-base text-red-700 font-medium'>{error.message}</div>
    }


    const form = useForm<TypeOfEditColorInput>({
        resolver: zodResolver(editColorZodSchema),
        defaultValues: {
            _id: "",
            name: "",
            slug: "",
            description: "",
            hexCode: ""
        }
    })

    const colorName = form.watch("name");

    useEffect(() => {
        const slugValue = slugify(colorName.toLowerCase())
        form.setValue("slug", slugValue)
    }, [colorName, form]);


    useEffect(() => {
        if (data?.data?.color) {
            const color = data?.data?.color as TypeOfColorData
            form.reset({
                _id: color._id || "",
                name: color.name || "",
                slug: color.slug || "",
                description: color.description || "",
                hexCode: color.hexCode || "",
            })
        }
    }, [data, form])

    async function onSubmit(data: TypeOfEditColorInput) {
        const result = await updateColorService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message)
        return router.push(adminRoutes.colors.colors);
    }


    return (<div className='space-y-3'>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <Card className="rounded-md p-3 gap-0 shadow-none">
            <div className="flex justify-between mb-1">
                <h1 className="text-xl text-violet-700 font-semibold"> Edit Color</h1>
                <Button asChild size={"sm"}>
                    <Link href={adminRoutes.colors.colors}>Show colors</Link>
                </Button>
            </div>
            <Separator className="mb-2" />
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
                                            <FormLabel>Color Name <span className="text-red-600">*</span></FormLabel>
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
                                    name="hexCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hex Code <span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Enter the hex code"
                                                        {...field} />
                                                    <div style={{ backgroundColor: form.watch("hexCode") }} className="w-10 h-full rounded-r-md absolute top-0 right-0"></div>
                                                </div>
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
                                    text={"Update color"}
                                />
                            </form>
                        </Form>
                    }
                </CardContent>
            </Card>
        </Card>
    </div>
    )
}

export default EditColorPage
