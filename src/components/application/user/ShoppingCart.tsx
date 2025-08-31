"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
const ShoppingCart = () => {
    return (
        <Sheet>
            <SheetTrigger asChild><Button className='relative' size={"icon"} variant={"ghost"}>
                <ShoppingCartIcon className='h-5 w-5' />
                <span className="absolute top-0 right-1">0</span>
            </Button></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ShoppingCart
