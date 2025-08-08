"use client"

import { Skeleton } from "@/components/ui/skeleton"

const EditMediaSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Image skeleton */}
            <div className="w-[200px]">
                <Skeleton className="h-56 w-full rounded" />
            </div>

            {/* Form fields skeleton */}
            <div className="flex-1 space-y-3">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-10 w-full rounded" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-10 w-full rounded" />
                </div>
                <Skeleton className="h-9 w-[150px] rounded" />
            </div>
        </div>
    )
}

export default EditMediaSkeleton
