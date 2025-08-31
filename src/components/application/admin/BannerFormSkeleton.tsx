import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BannerFormSkeleton() {
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full md:min-w-md" />
                    </div>

                    {/* Selected media thumbnails */}
                    <div className="flex gap-2 justify-center mt-4 flex-wrap">
                        <Skeleton className="h-16 w-24 rounded" />
                    </div>
                </div>
            </div>
            <Skeleton className="h-10 w-40" />
        </div>
    );
}
