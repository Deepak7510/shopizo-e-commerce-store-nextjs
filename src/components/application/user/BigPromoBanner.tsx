import { Button } from '@/components/ui/button';
import { TypeOfBannerData } from '@/types/admin.banners.types';
import Image from 'next/image';
import Link from 'next/link'

// This will be called at build time, but won't break the build if API is down
async function fetchBigPromoBanner() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/banners/get-all?type=bigpromo`,
            {
                next: {
                    revalidate: 3600, // Revalidate every hour
                    tags: ['big-promo-banners']
                }
            }
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

const BigPromoBanner = async () => {
    const result = await fetchBigPromoBanner();
    const banners = result?.data?.banners as TypeOfBannerData[] | undefined;

    return (
        <div>
            <h2 className="mb-5 font-medium text-2xl underline">Don&apos;t miss</h2>
            <div className="space-y-5 md:space-y-10">
                {banners && banners.length > 0 ? (
                    banners.map((bannerItem) => (
                        <div key={bannerItem._id} className="relative flex p-0 w-full h-[230px] md:h-[600px]">
                            <Image
                                src={bannerItem?.bannerImage.secure_url}
                                alt={bannerItem?.bannerImage.alt || bannerItem.title || "Banner"}
                                fill
                                unoptimized
                                className="object-cover rounded-md"
                            />
                            <div className="absolute left-[50%] translate-x-[-50%] bottom-5 md:bottom-25 z-10 flex flex-col items-center gap-2 md:gap-6">
                                <h2 className="text-white text-2xl md:text-5xl font-extrabold">{bannerItem.title}</h2>
                                <p className="font-medium text-white text-base md:text-2xl">{bannerItem.subtitle}</p>
                                <Button
                                    variant={"secondary"}
                                    className="rounded-full size-8 md:size-fit px-20 border-none dark:bg-white text-black"
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
                    <div className="text-center text-gray-500 py-10">
                        No banners available
                    </div>
                )}
            </div>
        </div>
    )
}

export default BigPromoBanner