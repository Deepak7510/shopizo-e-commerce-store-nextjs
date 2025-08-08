"use client"
import { Skeleton } from "@/components/ui/skeleton"

const EditCategorySkeleton = () => {
    return (
        <div className="w-full">
            <div className="space-y-3">
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

export default EditCategorySkeleton
