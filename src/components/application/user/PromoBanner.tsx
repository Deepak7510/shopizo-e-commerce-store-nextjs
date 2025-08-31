"use client"
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const PromoBanner = () => {

    const { data, error, loading } = useFetch(
        "/api/user/banners/get-all?type=promo",
        {},
        []
    );
    const banners = data?.data.banners as TypeOfBannerData[] | undefined;

    if (loading) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <p className="text-muted-foreground">Loading banners...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center">
                <p className="text-destructive">Failed to load banners</p>
            </div>
        );
    }


    return <div className='grid md:grid-cols-2 gap-15'>
        {banners && banners.map((bannerItem) => (
            <div key={bannerItem._id} className="relative flex p-0 w-full h-[360px]">
                <Image
                    src={bannerItem?.bannerImage.secure_url}
                    alt={bannerItem?.bannerImage.alt || bannerItem.title || "Banner"}
                    fill
                    className="object-cover"
                />
                <div className='absolute left-6 bottom-8 z-10 space-y-1'>
                    <h2 className='font-bold text-white text-2xl'>{bannerItem.title}</h2>
                    <p className='font-medium text-white text-lg'>{bannerItem.subtitle}</p>
                    <Button size={"sm"} variant={"secondary"} className='rounded-full border-none dark:bg-white text-black' asChild>
                        <Link href={bannerItem.link}>
                            {
                                bannerItem.buttonName || "Shop"
                            }
                        </Link>
                    </Button>
                </div>
            </div>
        ))
        }
    </div>
}

export default PromoBanner



{/*  */ }