"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { mediaType } from "@/types/admin.media.types";
import SelectMediaModel from "@/components/application/admin/SelectMediaModel";
import Image from "next/image";
import { addBannerZodSchema } from "@/zodSchema/admin.banner.schema";
import { TypeOfAddBannerInput } from "@/types/admin.banners.types";
import { createBannerService } from "@/services/client/admin/banners/crateBannerService";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: adminRoutes.products.products,
        title: "Banners",
    },
    {
        href: "",
        title: "Add Banner",
    },
];

export const bannerType = [
    { label: "HERO", value: "hero" },
    { label: "SLIDER", value: "slider" },
    { label: "PROMO", value: "promo" },
    { label: "BIGPROMO", value: "bigpromo" },
    { label: "SIDEBAR", value: "sidebar" },
    { label: "POPUP", value: "popup" },
];

const AddBannerPage = () => {
    const [openSelectMediaModel, setOpenSelectMediaModel] =
        useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<mediaType[]>([]);

    const form = useForm<TypeOfAddBannerInput>({
        resolver: zodResolver(addBannerZodSchema),
        defaultValues: {
            name: "",
            title: "",
            subtitle: "",
            buttonName: "",
            link: "",
            type: "",
            startDate: undefined,
            endDate: undefined,
            bannerImage: "",
        },
    });

    useEffect(() => {
        if (selectedMedia && selectedMedia.length > 0) {
            if (selectedMedia.length > 1) {
                setSelectedMedia([]);
                toast.error("You can select only one image");
                return;
            }
            const mediaIds = selectedMedia.map((mediaItem) => mediaItem._id);
            form.setValue("bannerImage", mediaIds[0]);
        }
    }, [selectedMedia]);

    async function onSubmit(data: TypeOfAddBannerInput) {
        const result = await createBannerService(data);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        form.reset();
        setSelectedMedia([]);
        toast.success(result.message);
    }

    return (
        <div className="space-y-2">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">Add Banner</h1>
                    <div className="flex items-center gap-2">
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.banners.Banners}>Show Banners</Link>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <Card className="rounded-sm shadow-none py-3">
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Name <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter the name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Title <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter the title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="subtitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sub title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter the sub title"
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
                                            name="buttonName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Button name <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter the button name"
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
                                            name="link"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Link <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter the link" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Type <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <FormControl className="w-full">
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {bannerType.map((item) => (
                                                                <SelectItem key={item.label} value={item.value}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Start Date <span className="text-red-600">*</span>
                                                    </FormLabel>
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
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                captionLayout="dropdown"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Validity <span className="text-red-600">*</span>
                                                    </FormLabel>
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
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                captionLayout="dropdown"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <SelectMediaModel
                                            selectedMedia={selectedMedia}
                                            setSelectedMedia={setSelectedMedia}
                                            setOpenSelectMediaModel={setOpenSelectMediaModel}
                                            openSelectMediaModel={openSelectMediaModel}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="bannerImage"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col justify-center items-center">
                                                    <FormLabel>
                                                        Banner image <span className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Button
                                                            type="button"
                                                            onClick={() => setOpenSelectMediaModel(true)}
                                                            className="w-full md:min-w-md"
                                                            variant={"outline"}
                                                        >
                                                            Open media
                                                        </Button>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-2 justify-center mt-4 flex-wrap">
                                            {selectedMedia &&
                                                selectedMedia.length > 0 &&
                                                selectedMedia.map((mediaItem, index) => (
                                                    <div
                                                        key={index}
                                                        className="h-15 w-25 relative rounded overflow-hidden"
                                                    >
                                                        <Image
                                                            src={mediaItem.secure_url}
                                                            alt={mediaItem.alt || "Media Image"}
                                                            className="object-cover w-full h-full"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <ButtonLoading
                                    type="submit"
                                    loading={form.formState.isSubmitting}
                                    text={"Save Banner"}
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </Card>
        </div>
    );
};

export default AddBannerPage;
