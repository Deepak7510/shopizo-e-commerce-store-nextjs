import React from 'react'
import { Card } from '@/components/ui/card'
import { stringShorter } from '@/lib/client/helperFunction'
import Image from 'next/image'
import Link from 'next/link'


const ProductCard = ({ productItem }: { productItem: any }) => {
    return (
        <Link key={productItem._id} href={''}>
            < Card className='p-1 rounded-md h-full shadow-none gap-0'>
                <div className="h-44 md:h-64 relative w-full rounded-t-sm overflow-hidden">
                    <Image
                        src={productItem?.media[0]?.secure_url}
                        alt={productItem?.media[0]?.alt || productItem.title || "Product image"}
                        className="object-cover"
                        fill
                        unoptimized
                    />
                </div>
                <div className='p-1'>
                    <p className='text-xs md:text-sm text-muted-foreground font-semibold'>{productItem?.brand?.name}</p>
                    <h2 className='font-medium text-xs md:text-sm' >{stringShorter(productItem.title, 3)}</h2>
                    <div className='flex gap-2 items-end'>
                        <p className='text-base md:text-lg font-semibold'>₹{productItem?.sellingPrice}</p>
                        <h2 className='text-sm md:text-base font-medium line-through'>₹{productItem.mrp}</h2>
                        <p className='text-xs md:text-base text-violet-700 font-medium'>{productItem?.discountPercentage}%  <span>off</span></p>
                    </div>
                </div>
            </Card >
        </Link >
    )
}

export default ProductCard
