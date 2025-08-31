import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CouponFormSkeleton = () => {
    return (
        <div className="w-full space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-10 w-full rounded" />
            </div>
            <Skeleton className="h-9 w-[150px] rounded mt-3" />
        </div>
    )
}

export default CouponFormSkeleton
