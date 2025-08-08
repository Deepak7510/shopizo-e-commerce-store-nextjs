"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserInfo } from '@/redux/authSlice';
import Link from 'next/link';
import LogoutHandlerButton from '../common/LogoutHandlerButton';

interface UserProfileMenuProps {
    userInfo: UserInfo;
}

const UserProfileMenu = ({ userInfo }: UserProfileMenuProps) => {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='h-10 w-10 border-2 border-violet-700'>
                    <AvatarFallback className='font-bold'>{userInfo.name[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 me-2'>
                <DropdownMenuLabel>{userInfo.name.split(" ")[0]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={""}>
                        Add Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={""}>
                        Orders
                    </Link>
                </DropdownMenuItem>
                <LogoutHandlerButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileMenu
