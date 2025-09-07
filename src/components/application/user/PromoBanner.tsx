import { Button } from '@/components/ui/button';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import Image from 'next/image';
import Link from 'next/link'

// This will be called at build time, but won't break the build if API is down
async function fetchBigPromoBanner() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/banners/get-all?type=promo`,
        )

        if (!res.ok) {
            throw new Error('Failed to fetch banners')
        }

        return res.json()
    } catch (error) {
        console.error('Fetch error:', error)
        return { data: { banners: [] } }
    }
}

const PromoBanner = async () => {
    const result = await fetchBigPromoBanner();
    const banners = result?.data?.banners as TypeOfBannerData[] | undefined;

    return (
        <div className='grid md:grid-cols-2 gap-5 md:gap-6'>
            {banners && banners.length > 0 ? (
                banners.map((bannerItem) => (
                    <div key={bannerItem._id} className="relative flex p-0 w-full h-[220px] md:h-[340px]">
                        <Image
                            src={bannerItem?.bannerImage.secure_url}
                            alt={bannerItem?.bannerImage.alt || bannerItem.title || "Promo banner image"}
                            fill
                            unoptimized
                            className="object-cover rounded-md"
                        />
                        <div className='absolute left-5 bottom-5 md:left-10 md:bottom-10 z-10 space-y-1 md:space-y-1.5'>
                            <h2 className='font-bold text-white text-2xl'>{bannerItem.title}</h2>
                            <p className='font-medium text-white text-lg'>{bannerItem.subtitle}</p>
                            <Button
                                size={"sm"}
                                variant={"secondary"}
                                className='rounded-full border-none dark:bg-white text-black'
                                asChild
                            >
                                <Link href={bannerItem.link}>
                                    {bannerItem.buttonName || "Shop"}
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 py-10 col-span-2">
                    No promo banners available
                </div>
            )}
        </div>
    )
}

export default PromoBanner