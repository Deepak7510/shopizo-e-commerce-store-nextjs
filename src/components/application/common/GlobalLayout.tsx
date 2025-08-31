"use client"
import { setLogin } from '@/redux/authSlice';
import { checkAuthService } from '@/services/client/auth/checkAuthService';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LoaderOne from './LoaderOne';
const GlobalLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const pathName = usePathname();

    useEffect(() => {
        async function checkAuthHandler() {
            setLoading(true);
            const result = await checkAuthService();
            if (!result.success) {
                dispatch(setLogin({
                    userInfo: null,
                    isAuthenticated: false,
                }));
                setLoading(false);
                return
            }
            dispatch(setLogin({
                userInfo: result.data.userInfo,
                isAuthenticated: true,
            }));
            setLoading(false);
        }

        checkAuthHandler();
    }, [pathName]);


    if (loading) return <LoaderOne />

    return (
        <>
            {children}
        </>
    )
}

export default GlobalLayout
