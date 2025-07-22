"use client"
import { setLogin } from '@/redux/authSlice';
import { checkAuthService } from '@/services/auth/checkAuthService';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
const GlobalLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const dispatch = useDispatch();
    const pathName = usePathname();

    useEffect(() => {
        async function checkAuthHandler() {
            const result = await checkAuthService();
            if (result.success) {
                dispatch(setLogin({
                    userInfo: result.userInfo,
                    isAuthenticated: true,
                }));
            } else {
                dispatch(setLogin({
                    userInfo: null,
                    isAuthenticated: false,
                }));
            }
        }
        checkAuthHandler();
    }, [dispatch, pathName])

    return (
        <div>
            {children}
        </div>
    )
}

export default GlobalLayout
