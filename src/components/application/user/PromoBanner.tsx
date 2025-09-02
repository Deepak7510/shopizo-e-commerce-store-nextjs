import { Button } from '@/components/ui/button';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const fetchBigPromoBanner = async function () {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/banners/get-all?type=promo`)
        return response.data
    } catch (error: any) {
        console.error(error)
        return error.response.data
    }
}

const PromoBanner = async () => {
    const result = await fetchBigPromoBanner();
    const banners = result?.data.banners as TypeOfBannerData[] | undefined;


    return <div className='grid md:grid-cols-2 gap-12'>
        {banners && banners.map((bannerItem) => (
            <div key={bannerItem._id} className="relative flex p-0 w-full h-[230px] md:h-[350px]">
                <Image
                    src={bannerItem?.bannerImage.secure_url}
                    alt={bannerItem?.bannerImage.alt || bannerItem.title || "Banner"}
                    fill
                    className="object-cover rounded-md"
                />
                <div className='absolute left-10 bottom-10 z-10 space-y-1.5'>
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