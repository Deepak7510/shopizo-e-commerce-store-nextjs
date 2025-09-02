import * as React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

function CoustomerReviews() {
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h2 className='font-medium  text-xl md:text-2xl underline'>
                    Coustomers Reviews
                </h2>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                            <div className="p-1">
                                < Card className='py-5 shadow-none gap-1 bg-slate-50 border-slate-200 dark:border-slate-700 dark:bg-slate-950/20'>
                                    <CardContent className="space-y-2 px-5">
                                        <div className="flex gap-3 items-center">
                                            <Avatar className="border-2 border-violet-700">
                                                <AvatarFallback>
                                                    D
                                                </AvatarFallback>
                                            </Avatar>
                                            <h2 className="font-medium">Deepak Kumar Yadav</h2>
                                        </div>
                                        <ScrollArea className="h-[180px] w-full">
                                            <h1 className="font-semibold">Title Title Title Title</h1>
                                            <p className="text-muted-foreground text-sm">
                                                Jokester began sneaking into the castle in the middle of the night and leaving
                                                jokes all over the place: under the king's pillow, in his soup, even in the
                                                royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
                                                then, one day, the people of the kingdom discovered that the jokes left by
                                                Jokester were so funny that they couldn't help but laugh. And once they
                                                started laughing, they couldn't stop.
                                            </p>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="relative justify-center flex mt-8 gap-5">
                    <CarouselPrevious className="static" />
                    <CarouselNext className="static" />
                </div>
            </Carousel>
        </div>
    )
}

export default CoustomerReviews
