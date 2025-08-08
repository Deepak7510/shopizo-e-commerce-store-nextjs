"use client"
import { setLogin } from '@/redux/authSlice';
import { checkAuthService } from '@/services/client/auth/checkAuthService';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoaderOne from './LoaderOne';
import { RootState } from '@/redux/store';
import RouteProtectGaurd from './RouteProtectGaurd';
const GlobalLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { userInfo, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const pathName = usePathname();

    useEffect(() => {
        async function checkAuthHandler() {
            setLoading(true);
            const result = await checkAuthService();
            console.log(result)
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
        <RouteProtectGaurd isAuthenticated={isAuthenticated} userInfo={userInfo!}>
            {children}
        </RouteProtectGaurd>
    )
}

export default GlobalLayout
