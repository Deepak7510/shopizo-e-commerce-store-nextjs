"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { use, useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/application/common/ButtonLoading";
import Link from "next/link";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { TypeOfEditCouponInput } from "@/types/admin.coupons.types";
import { editCouponZodSchema } from "@/zodSchema/admin.coupons.schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import useFetch from "@/hooks/useFetch";
import { updateCouponService } from "@/services/client/coupons/updateCouponService";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: adminRoutes.products.products,
        title: "Coupons",
    },
    {
        href: "",
        title: "Edit Coupon",
    },
];

const EditCouponPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter()
    const { id } = use(params)
    const { data: couponData, error: couponError, loading: couponLoading } = useFetch(`/api/admin/coupons/details/${id}`, {}, [id])

    if (couponError) {
        return <div>{couponError.message || "Somthing went worng"}</div>
    }

    const form = useForm<TypeOfEditCouponInput>({
        resolver: zodResolver(editCouponZodSchema),
        defaultValues: {
            _id: "",
            code: "",
            discountPercentage: 0,
            minShoppingAmount: 0,
            validity: undefined,
        },
    });

    useEffect(() => {
        if (couponData && !couponLoading) {
            const couponsDetails = couponData?.data.couponDetails;
            form.reset({
                _id: couponsDetails?._id,
                code: couponsDetails?.code || "",
                discountPercentage: couponsDetails?.discountPercentage || 0,
                minShoppingAmount: couponsDetails?.minShoppingAmount || 0,
                validity: couponsDetails?.validity || undefined,
            });
        }
    }, [couponData])

    async function onSubmit(data: TypeOfEditCouponInput) {
        const result = await updateCouponService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        toast.success(result.message);
        return router.push(adminRoutes.coupons.coupons);
    }

    return (
        <div className="space-y-2">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <div className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Edit Coupon
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.coupons.coupons}>
                                Back to Coupons
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>

                        {couponLoading ?
                            <div className="w-full">
                                <div className="grid md:grid-cols-2 gap-3">
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
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[60px]" />
                                        <Skeleton className="h-10 w-full rounded" />
                                    </div>
                                </div>
                                <Skeleton className="h-9 w-[150px] rounded mt-3" />
                            </div>
                            :
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-3"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Code <span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter the Title"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="discountPercentage"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Discount percentage <span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Enter the Title"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="minShoppingAmount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Min Shopping Amount <span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Enter the min shopping amount"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="validity"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Validity <span className="text-red-600">*</span></FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) =>
                                                                        date < new Date()
                                                                    }
                                                                    captionLayout="dropdown"
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <ButtonLoading
                                        type="submit"
                                        loading={form.formState.isSubmitting}
                                        text={"Update Coupon"}
                                    />
                                </form>
                            </Form>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditCouponPage;
