"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { logoutService } from '@/services/client/auth/logoutService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authRoutes } from '@/lib/client/routes';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const LogoutHandlerButton = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        setLoading(true);
        try {
            const result = await logoutService();
            if (result.success) {
                toast.success(result.message || "Logged out successfully");
                sessionStorage.removeItem("accessToken");
                router.push(authRoutes.login);
            } else {
                toast.error(result.message || "Logout failed");
            }
        } catch (error) {
            toast.error("Something went wrong during logout");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost" disabled={loading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {loading ? "Logging out..." : "Logout"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You’ll be returned to the login screen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} disabled={loading}>
                        {loading ? "Processing..." : "Logout"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutHandlerButton;
