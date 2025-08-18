"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"



export function LatestOrder() {
    return (
        <Card className="gap-0 py-2 shadow-none">
            <CardHeader className="flex justify-between py-2">
                <CardTitle>
                    Latest Orders
                </CardTitle>
                <Button size="sm" asChild>
                    <Link href={''}>
                        View All
                    </Link>
                </Button>
            </CardHeader>
            <Separator />
            <CardContent className="py-2">

            </CardContent>
        </Card>

    )
}

