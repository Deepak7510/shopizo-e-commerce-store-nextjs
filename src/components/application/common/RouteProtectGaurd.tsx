"use client"
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { userRoutes } from '@/lib/client/routes';

interface RouteProtectGaurdProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    userInfo: {
        name: string,
        email: string,
        role: string,
        avatar?: string
    };
}

const RouteProtectGaurd = ({ children, isAuthenticated, userInfo }: RouteProtectGaurdProps) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && pathname.includes("/auth")) return router.push(userRoutes.home);

        if (isAuthenticated && pathname.includes('/admin') && userInfo?.role === "user") return router.push(userRoutes.home);

        if (!isAuthenticated && pathname.includes('/admin')) return router.push(userRoutes.home);

    }, [isAuthenticated, userInfo, router]);

    return <>{children}</>;
};

export default RouteProtectGaurd;
