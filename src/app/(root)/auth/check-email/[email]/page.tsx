"use client";

import ApplicationLogo from "@/components/application/common/ApplicationLogo";
import LoaderOne from "@/components/application/common/LoaderOne";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authRoutes } from "@/lib/client/routes";
import { resendEmailVerifyLinkService } from "@/services/auth/resendEmailVerifylinkService";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CheckEmailPage = ({ params }: { params: Promise<{ email: string }> }) => {



    const { email } = use(params)
    const decodeEmail = decodeURIComponent(email)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState<number>(60); // Default: match SSR/CSR

    const intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("resendverifylinkcooldownSec");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (!isNaN(parsed)) {
                    setCooldown(parsed);
                }
            }
        } catch (error) {
            console.error("Failed to read cooldown from sessionStorage:", error);
        }
    }, []);

    useEffect(() => {
        if (cooldown > 0) {
            intervalId.current = setInterval(() => {
                setCooldown((prev) => {
                    const updated = prev - 1;
                    try {
                        sessionStorage.setItem("resendverifylinkcooldownSec", JSON.stringify(updated));
                    } catch (error) {
                        console.error("SessionStorage error:", error);
                    }
                    return updated;
                });
            }, 1000);
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, [cooldown]);

    const handleResendEmailVerifyLink = async () => {
        setLoading(true);
        const result = await resendEmailVerifyLinkService({ email: decodeEmail });
        if (result.success) {
            toast.success(result.message);
            setCooldown(60);
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    };

    return (
        <Card className="max-w-md shadow-none">
            <CardContent className="space-y-1 text-center">
                <div className="flex items-center flex-col gap-1">
                    <ApplicationLogo />
                    <h1 className="text-2xl font-bold text-violet-700"> Verify Your Account</h1>
                    <p className="text-muted-foreground text-sm">
                        We’ve sent a verification link to your email <span className="font-medium">{decodeEmail}</span>.
                    </p>
                </div>
                <div className="mt-2">
                    <Button onClick={() => router.push(authRoutes.login)} size={'sm'} className="w-full">Go to Login Page</Button>
                </div>

                {cooldown > 0 ? (
                    <p className="text-sm text-muted-foreground">
                        You can request a new code in <span className="font-medium">{cooldown}s</span>
                    </p>
                ) : (
                    <Button disabled={loading} size="sm" variant="link" onClick={handleResendEmailVerifyLink}>
                        Resend Verification Link
                    </Button>
                )}

                {loading ? <LoaderOne /> : null}
            </CardContent>
        </Card>
    );
};

export default CheckEmailPage;
