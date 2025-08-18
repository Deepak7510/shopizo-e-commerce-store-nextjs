"use client";
import { Skeleton } from "@/components/ui/skeleton";

const AddProductSkeleton = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2 md:col-span-2">
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
        <div className="space-y-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-10 w-full rounded" />
        </div>


        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-20 w-full rounded" />
        </div>
        <div className="space-y-2 md:col-span-2 flex flex-col justify-center items-center">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </div>
      <Skeleton className="h-9 w-[150px] rounded my-3" />
    </div>
  );
};

export default AddProductSkeleton;
