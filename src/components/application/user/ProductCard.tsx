import React from 'react'
import { Card } from '@/components/ui/card'
import { stringShorter } from '@/lib/client/helperFunction'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'


const ProductCard = ({ productItem }: { productItem: any }) => {
    return (
        <Link key={productItem._id} href={''}>
            < Card className='p-1 rounded-md h-full relative shadow-none gap-0'>
                <div className="h-64 relative w-full">
                    <Image
                        src={productItem?.defaultVariant[0]?.media[0]?.secure_url}
                        alt={"Media Image"}
                        className="object-cover"
                        fill
                    />
                </div>
                <div className=''>
                    <p className='text-sm font-semibold'>{productItem?.brand?.name}</p>
                    <h2 className='font-medium' >{stringShorter(productItem.title, 3)}</h2>
                    <div className='flex gap-2 items-end'>
                        <p className='text-lg font-semibold'>₹{productItem?.defaultVariant[0]?.sellingPrice}</p>
                        <h2 className='text-base font-medium line-through'>₹{productItem?.defaultVariant[0]?.mrp}</h2>
                        <p className='text-base text-violet-700 font-medium'>{productItem?.defaultVariant[0]?.discountPercentage}%  <span>off</span></p>
                    </div>
                </div>

                {
                    productItem?.defaultVariant[0]?.stock <= 10 &&
                    <Badge className='rounded-full absolute top-2 left-2 text-xs' variant={"destructive"}>
                        Only left {productItem?.defaultVariant[0]?.stock}
                    </Badge>
                }

            </Card>
        </Link>
    )
}

export default ProductCard
