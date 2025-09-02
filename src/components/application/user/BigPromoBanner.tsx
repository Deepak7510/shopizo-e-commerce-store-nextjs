import { Button } from '@/components/ui/button';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const fetchBigPromoBanner = async function () {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/banners/get-all?type=bigpromo`)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}

const BigPromoBanner = async () => {
    const result = await fetchBigPromoBanner();
    const banners = result?.data.banners as TypeOfBannerData[] | undefined;

    return <div>
        <h2 className="mb-5 font-medium text-2xl underline">Don&apos;t miss</h2>
        <div className="space-y-10">
            {banners && banners.map((bannerItem) => (
                <div key={bannerItem._id} className="relative flex p-0 w-full h-[250px] md:h-[600px]">
                    <Image
                        src={bannerItem?.bannerImage.secure_url}
                        alt={bannerItem?.bannerImage.alt || bannerItem.title || "Banner"}
                        fill
                        className="object-cover rounded-md"
                    />
                    <div className="absolute left-[50%] translate-x-[-50%] bottom-5 md:bottom-25 z-10 flex flex-col items-center gap-2 md:gap-6">
                        <h2 className="text-white text-2xl md:text-5xl font-extrabold">{bannerItem.title}</h2>
                        <p className="font-medium text-white text-base md:text-2xl">{bannerItem.subtitle}</p>
                        <Button variant={"secondary"} className="rounded-full size-8 md:size-fit px-20 border-none dark:bg-white text-black" asChild>
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