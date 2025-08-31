import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SubcategoryFormSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-15 w-full" />
            </div>

            <Skeleton className="h-10 w-40" />
        </div>
    )
}

export default SubcategoryFormSkeleton
