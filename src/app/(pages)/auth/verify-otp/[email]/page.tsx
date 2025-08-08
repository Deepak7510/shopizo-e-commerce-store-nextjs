"use client"
import { Card, CardContent } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { use, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { ButtonLoading } from '@/components/application/common/ButtonLoading';
import { optVerifyService } from '@/services/client/auth/otpVerifyService';
import { Button } from '@/components/ui/button';
import { resendOtpService } from '@/services/client/auth/resendOptService';
import { useRouter } from 'next/navigation';
import { userRoutes } from '@/lib/client/routes';
import LoaderOne from '@/components/application/common/LoaderOne';
import ApplicationLogo from '@/components/application/common/ApplicationLogo';
import { TypeOfOtpInput } from '@/types/auth.types';
import { emailZodSchema, otpZodSchema } from '@/zodSchema/auth.schema';

interface VerifyOtpPageProps {
    params: Promise<{ email: string }>
}

const VerifyOtpPage: React.FC<VerifyOtpPageProps> = ({ params }) => {
    const router = useRouter();
    const { email: myEmail } = use(params)
    const email = decodeURIComponent(myEmail);
    const [cooldown, setCooldown] = useState<number>(60);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("resendotpcooldownSec");
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
                setCooldown(pre => {
                    let updated = pre - 1
                    try {
                        sessionStorage.setItem("resendotpcooldownSec", JSON.stringify(updated));
                    } catch (error) {
                        console.error("Failed to write cooldown from sessionStorage:", error);
                    }
                    return updated
                })
            }, 1000)
        } else {
            if (intervalId.current) clearInterval(intervalId.current);
        }

        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
        }
    }, [cooldown]);



    const form = useForm<TypeOfOtpInput>({
        resolver: zodResolver(otpZodSchema),
        defaultValues: {
            otp: ""
        }
    });

    async function onSubmit({ otp }: TypeOfOtpInput) {

        const checkValidation = emailZodSchema.safeParse({ email });
        if (!checkValidation.success) {
            toast.error(checkValidation.error.formErrors.fieldErrors.email);
            return;
        }
        const result = await optVerifyService({ otp, email });
        if (!result.success) {
            toast.error(result.message)
            return
        }
        toast.success(result.message);
        sessionStorage.setItem("accessToken", JSON.stringify(result.data.accessToken));
        return router.push(userRoutes.home);
    }


    async function handleResendOtp() {
        const checkValidation = emailZodSchema.safeParse({ email });
        if (!checkValidation.success) {
            toast.error(checkValidation.error.formErrors.fieldErrors.email);
            return;
        }
        setLoading(true)
        const result = await resendOtpService({ email });
        if (!result.success) {
            toast.error(result.message)
            setLoading(false)
            return
        }
        toast.success(result.message);
        setCooldown(60);
        setLoading(false)
    }

    return (
        <Card className="shadow-none w-sm">
            <CardContent className="text-center space-y-2">
                {
                    loading ?
                        <LoaderOne />
                        :
                        null
                }
                <div className="flex flex-col items-center gap-1">
                    <ApplicationLogo />
                    <h2 className="text-2xl font-bold text-violet-700">
                        Verify Your Account
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Enter the 6-digit code we sent to your <span className="font-medium">{email}</span>.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center justify-center">
                                    <FormLabel className="text-sm font-medium">
                                        One-Time Password (OTP)
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                {[0, 1, 2, 3, 4, 5].map(index => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        className="text-xl h-12 w-12"
                                                        index={index}
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonLoading
                            className="w-full"
                            type="submit"
                            text="Verify"
                            loading={form.formState.isSubmitting}
                        />
                    </form>
                </Form>

                <p className="text-xs text-muted-foreground">
                    This code is valid for 10 minutes. For your security, please do not share it with anyone.
                </p>

                {cooldown > 0 ? (
                    <p className="text-sm text-muted-foreground">
                        You can request a new code in <span className="font-medium">{cooldown}s</span>
                    </p>
                ) : (
                    <Button
                        disabled={loading}
                        onClick={handleResendOtp}
                        variant="link"
                        className="text-sm font-medium"
                    >
                        Resend OTP
                    </Button>
                )}
            </CardContent>
        </Card>
    )

}

export default VerifyOtpPage