"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MediaCardSkeleton = () => {
    return (
        <Card className="rounded shadow-none py-2 relative hover:border-violet-700">
            <CardContent className="px-2">
                <Skeleton className="absolute top-4 left-4 h-5 w-5 rounded-sm border-2 border-violet-700" />
                <div className="absolute top-4 right-4 flex flex-col justify-between items-center h-6 w-6 py-[2px]">
                    <span className="h-1 w-1 rounded-full bg-violet-700" />
                    <span className="h-1 w-1 rounded-full bg-violet-700" />
                    <span className="h-1 w-1 rounded-full bg-violet-700" />
                </div>
                <Skeleton className="absolute top-4 right-4 h-6 w-6 rounded-full" />
                <Skeleton className="w-full h-64 rounded object-cover" />
            </CardContent>
        </Card>
    );
};

export default MediaCardSkeleton;
