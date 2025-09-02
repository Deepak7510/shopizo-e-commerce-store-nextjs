"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export const description = "A donut chart with text"

const chartData = [
    { status: "Pending", count: 275, fill: "#f43f5e" },   // pink-500
    { status: "Proccessing", count: 200, fill: "#3b82f6" }, // blue-500
    { status: "Shipped", count: 287, fill: "#22c55e" },   // green-500
    { status: "Delivered", count: 173, fill: "#f59e0b" }, // amber-500
    { status: "Cancelled", count: 190, fill: "#6b7280" }, // gray-500
    { status: "Unverified", count: 190, fill: "#9ca3af" }, // gray-500
]


const chartConfig = {
    pending: {
        label: "Pending",
        color: "#f43f5e", // tailwind pink-500
    },
    proccessing: {
        label: "Processing",
        color: "#3b82f6", // blue-500
    },
    shipped: {
        label: "Shipped",
        color: "#22c55e", // green-500
    },
    delivered: {
        label: "Delivered",
        color: "#f59e0b", // amber-500
    },
    cancelled: {
        label: "Cancelled",
        color: "#6b7280", // gray-500
    },
    unverified: {
        label: "Unverified",
        color: "#9ca3af",
    },
} satisfies ChartConfig


export function OrderStatusPieChart() {
    const totalCount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0)
    }, [])

    return (
        <Card className="flex flex-col h-full gap-0 py-2">
            <CardHeader className="flex justify-between py-2 px-4">
                <CardTitle>Orders Status</CardTitle>
                <Button size="sm" asChild><Link href={''}>View All</Link></Button>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[180px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={40}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-xl font-bold"
                                                >
                                                    {totalCount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Orders
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="mt-5 space-y-1">
                    {
                        chartData.map((item, index) => {
                            return <div key={index} className="flex w-full justify-between items-center">
                                <p className="text-gray-900">{item.status}</p>
                                <div style={{ backgroundColor: item.fill }} className={`p-1 text-white rounded-full`}>{item.count}</div>
                            </div>
                        })
                    }

                </div>
            </CardContent>
        </Card >
    )
}
