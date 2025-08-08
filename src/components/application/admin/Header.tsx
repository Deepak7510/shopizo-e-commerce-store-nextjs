"use client"
import { useSidebar } from '@/components/ui/sidebar'
import React from 'react'
import LogoutHandlerButton from '../common/LogoutHandlerButton'
import SearchHandler from './SearchHandler'
import { AlignJustify } from 'lucide-react'
import { ThemeButton } from '@/app/ThemeButton'
import UserProfileMenu from './UserProfileMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Header = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { toggleSidebar } = useSidebar();

    return (
        <div className='h-13 w-full z-10 sticky top-0 left-0 right-0 bg-background border-b flex md:px-10 items-center justify-between'>
            <button onClick={() => toggleSidebar()} className='text-violet-700 cursor-pointer p-2 md:hidden'><AlignJustify className='w-7 h-7' /></button>
            <div>
                <SearchHandler />
            </div>
            <div className='flex justify-center items-center gap-4'>
                <ThemeButton />
                {userInfo ? <UserProfileMenu userInfo={userInfo} /> : null}
            </div>
        </div>
    )
}

export default Header
