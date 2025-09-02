"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { TypeOfBannerData } from "@/types/admin.banners.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function MainSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true }) // ⏱️ thoda bada delay UX ke liye
    );

    const { data, error, loading } = useFetch(
        "/api/user/banners/get-all?type=slider",
        {},
        []
    );

    const banners = data?.data.banners as TypeOfBannerData[] | undefined;

    if (loading) {
        return (
            <Skeleton className="w-full h-[350px] md:h-[500px]" />
        );
    }

    if (error) {
        return (
            <div className="w-full h-[350px] md:h-[500px] flex items-center justify-center">
                <p className="text-destructive">Failed to load banners</p>
            </div>
        );
    }

    if (!banners?.length) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <p className="text-muted-foreground">No banners available</p>
            </div>
        );
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {banners.map((bannerItem, index) => (
                    <CarouselItem
                        key={bannerItem._id || index}
                        className="h-[350px] md:h-[500px] w-full relative"
                    >
                        <div className="w-full">
                            <Image
                                src={bannerItem?.bannerImage.secure_url}
                                alt={
                                    bannerItem?.bannerImage.alt || bannerItem.title || "Banner"
                                }
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute left-[20%] md:left-[15%] translate-x-[-15%] bottom-15 z-10  flex flex-col gap-3 md:gap-6">
                            <h2 className="font-extrabold text-white text-3xl md:text-5xl">
                                {bannerItem.title}
                            </h2>
                            {bannerItem.subtitle && (
                                <p className="font-medium text-white text-xl md:text-2xl">
                                    {bannerItem.subtitle}
                                </p>
                            )}
                            <Button
                                variant={"secondary"}
                                className="rounded-full md:size-fit w-fit px-15 border-none dark:bg-white text-black"
                                asChild
                            >
                                <Link href={bannerItem.link}>
                                    {bannerItem.buttonName || "Shop now"}
                                </Link>
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-5" aria-label="Previous Slide" />
            <CarouselNext className="right-5" aria-label="Next Slide" />
        </Carousel>
    );
}
