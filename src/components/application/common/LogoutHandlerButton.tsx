"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';

const LogoutHandlerButton = () => {
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogout() {

    }

    return (
        <Button className='px-5' size={'sm'} type='button' disabled={loading} onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default LogoutHandlerButton
