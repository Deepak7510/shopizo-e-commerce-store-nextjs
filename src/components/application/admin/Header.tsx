import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import LogoutHandlerButton from '../common/LogoutHandlerButton'

const Header = () => {
    return (
        <div className='h-13 border-b w-full flex md:px-10 items-center justify-between'>
            {/* <SidebarTrigger /> */}
            <div>
                <Input className='rounded-full w-xs' type="search" />
            </div>
            <div>
                <LogoutHandlerButton />
            </div>
        </div>
    )
}

export default Header
