"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { useEffect } from "react";
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
import { TypeOfAddCouponInput } from "@/types/admin.coupons.types";
import { addCouponZodSchema } from "@/zodSchema/admin.coupons.schema";
import { createCouponService } from "@/services/client/admin/coupons/createCouponService";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
        title: "Add Coupon",
    },
];

const AddCouponPage = () => {

    const form = useForm<TypeOfAddCouponInput>({
        resolver: zodResolver(addCouponZodSchema),
        defaultValues: {
            code: "",
            discountPercentage: 0,
            minShoppingAmount: 0,
            validity: undefined,
        }
    });

    const discountPercentage = form.watch("discountPercentage")
    const minShoppingAmount = form.watch("minShoppingAmount")
    useEffect(() => {
        form.setValue("discountPercentage", discountPercentage && Number(discountPercentage))
        form.setValue("minShoppingAmount", minShoppingAmount && Number(minShoppingAmount))
    }, [discountPercentage, minShoppingAmount, form]);

    async function onSubmit(data: TypeOfAddCouponInput) {
        const result = await createCouponService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        toast.success(result.message);
    }

    return (
        <div className="space-y-2">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">
                        Add Coupon
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.coupons.coupons}>
                                Show Coupons
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-3"
                            >
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

                                <ButtonLoading
                                    type="submit"
                                    loading={form.formState.isSubmitting}
                                    text={"Save Coupon"}
                                />
                            </form>
                        </Form>
                    </CardContent >
                </Card >
            </Card >
        </div >
    );
};

export default AddCouponPage;
