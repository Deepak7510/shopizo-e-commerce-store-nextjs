"use client"
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const BigPromoBanner = () => {

    const { data, error, loading } = useFetch(
        "/api/user/banners/get-all?type=bigpromo",
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


    return <div>
        <h2 className='mb-5 font-medium text-2xl underline'>Don't miss</h2>
        <div className='space-y-10'>
            {banners && banners.map((bannerItem) => (
                <div key={bannerItem._id} className="relative flex p-0 w-full h-[600px]">
                    <Image
                        src={bannerItem?.bannerImage.secure_url}
                        alt={bannerItem?.bannerImage.alt || bannerItem.title || "Banner"}
                        fill
                        className="object-cover"
                    />
                    <div className='absolute left-[50%] translate-x-[-50%] bottom-20 z-10  flex flex-col items-center gap-8'>
                        <h2 className='text-white text-5xl font-extrabold'>{bannerItem.title}</h2>
                        <p className='font-medium text-white text-2xl'>{bannerItem.subtitle}</p>
                        <Button variant={"secondary"} className='rounded-full px-20 border-none dark:bg-white text-black' asChild>
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
    </div>

}

export default BigPromoBanner



{/*  */ }