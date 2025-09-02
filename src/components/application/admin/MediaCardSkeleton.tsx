import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MediaCardSkeleton = () => {
    return (
        <Card className="rounded shadow-none py-2 hover:border-violet-700">
            <CardContent className="px-2">
                <Skeleton className="w-full h-64 rounded object-cover" />
            </CardContent>
        </Card>
    );
};

export default MediaCardSkeleton;
