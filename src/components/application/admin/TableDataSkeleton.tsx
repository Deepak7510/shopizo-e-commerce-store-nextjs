import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TableDataSkeleton = () => {
    return <div className="w-full">
        <div className="flex justify-between items-center my-2">
            <div className="md:w-1/2">
                <Skeleton className="h-10 max-w-md rounded-full" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
        <div className="border space-y-2 rounded-md p-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex justify-between items-center mt-2 px-2">
            <div>
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex gap-5 items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
    </div>
}

export default TableDataSkeleton
