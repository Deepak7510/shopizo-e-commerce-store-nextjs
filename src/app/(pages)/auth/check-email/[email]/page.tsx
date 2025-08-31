"use client";
import ApplicationLogo from "@/components/application/common/ApplicationLogo";
import LoaderOne from "@/components/application/common/LoaderOne";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authRoutes } from "@/lib/client/routes";
import { resendEmailVerifyLinkService } from "@/services/client/auth/resendEmailVerifylinkService";
import { emailZodSchema } from "@/zodSchema/auth.schema";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CheckEmailPageProps {
    params: Promise<{ email: string }>
}

const CheckEmailPage: React.FC<CheckEmailPageProps> = ({ params }) => {
    const paramsValue = use(params);
    const email = decodeURIComponent(paramsValue.email);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [cooldown, setCooldown] = useState<number>(60);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("resendVerifylinkCoolDownSec");
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
                        sessionStorage.setItem("resendVerifylinkCoolDownSec", JSON.stringify(updated));
                    } catch (error) {
                        console.error("SessionStorage error:", error);
                    }
                    return updated;
                });
            }, 1000);
        } else {
            if (intervalId.current) clearInterval(intervalId.current)
            sessionStorage.removeItem("resendVerifylinkCoolDownSec")
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, [cooldown]);

    const handleResendEmailVerifyLink = async () => {
        const checkValidation = emailZodSchema.safeParse({ email });
        if (!checkValidation.success) {
            toast.error(checkValidation.error.formErrors.fieldErrors.email)
            return;
        }
        setLoading(true);
        const result = await resendEmailVerifyLinkService({ email: checkValidation.data.email });
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        toast.success(result.message);
        setCooldown(60);
        setLoading(false);
    };

    return (
        <Card className="max-w-md shadow-none">
            <CardContent className="space-y-1 text-center">
                <div className="flex items-center flex-col gap-1">
                    <ApplicationLogo />
                    <h1 className="text-2xl font-bold text-violet-700"> Verify Your Account</h1>
                    <p className="text-muted-foreground text-sm">
                        We’ve sent a verification link to your email <span className="font-medium">{email}</span>.
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
