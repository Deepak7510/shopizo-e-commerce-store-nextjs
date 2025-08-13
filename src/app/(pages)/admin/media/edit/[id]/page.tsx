"use client"
import EditMediaSkeleton from '@/components/application/admin/EditMediaSkeleton'
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb'
import { ButtonLoading } from '@/components/application/common/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useFetch from '@/hooks/useFetch'
import { adminRoutes } from '@/lib/client/routes'
import { updateMediaService } from '@/services/client/media/updateMediaService'
import { TypeOfEditMedia } from '@/types/admin.media.types'
import { editMediaZodSchema } from '@/zodSchema/admin.media.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditMediaProps {
    params: Promise<{ id: string }>
}

const breadcrumbList: breadcrumbListType[] = [
    {
        title: "Home",
        href: adminRoutes.dashboard
    },
    {
        title: "Media",
        href: adminRoutes.medias.media
    },
    {
        title: "Edit",
        href: ""
    }
]

const EditMedia: React.FC<EditMediaProps> = ({ params }) => {
    const paramsValue = use(params)
    const { data, error, loading, refetch } = useFetch(`/api/admin/media/details/${paramsValue.id}`, {}, [paramsValue.id]);

    const form = useForm<TypeOfEditMedia>({
        resolver: zodResolver(editMediaZodSchema),
        defaultValues: {
            _id: "",
            alt: "",
            title: ""
        }
    })

    useEffect(() => {
        if (data && !loading) {
            form.reset({
                _id: data.data.mediaDetails._id || "",
                alt: data.data.mediaDetails.alt || "",
                title: data.data.mediaDetails.title || "",
            })
        }
    }, [data])

    if (error) {
        return <div className='text-red-700'>
            {error.message}
        </div>
    }

    async function onSubmit(data: TypeOfEditMedia) {
        const result = await updateMediaService(data);
        if (!result.success) {
            toast.error(result.message);
            return
        }
        form.reset()
        toast.success(result.message);
        form.reset({
            _id: result.data.updatedMedia._id || "",
            alt: result.data.updatedMedia.alt || "",
            title: result.data.updatedMedia.title || "",
        });
    }

    paramsValue.id
    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-sm shadow-none py-3">
                <CardHeader className="px-1.5 md:px-6">
                    <div className="flex justify-between">
                        <h1 className="text-xl text-violet-700 font-semibold">
                            Edit Media
                        </h1>
                        <Button size={'sm'} asChild>
                            <Link href={adminRoutes.medias.media}>
                                Back to Media
                            </Link>
                        </Button>

                    </div>
                    <Separator />
                </CardHeader>
                <CardContent className="px-1.5 md:px-6">
                    {
                        loading ? <EditMediaSkeleton /> :
                            data?.data.mediaDetails ?
                                <div className='flex flex-col md:flex-row gap-4 w-full'>
                                    <div className='w-[200px]'>
                                        <Image
                                            src={data?.data.mediaDetails.secure_url}
                                            alt={data?.data.mediaDetails.alt || "Media Image"}
                                            className="object-cover h-56 rounded"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1/4">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter the title" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="alt"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Alt</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter the alt" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <ButtonLoading
                                                type="submit"
                                                loading={form.formState.isSubmitting}
                                                text={"Update Media"}
                                            />
                                        </form>
                                    </Form>
                                </div>
                                : <div>Media not found</div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default EditMedia
