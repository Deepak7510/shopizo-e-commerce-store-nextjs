"use client"

import { openTabType } from "@/app/(root)/auth/forget-password/page"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import LoaderOne from "../common/LoaderOne"
import { Form, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ButtonLoading } from "../common/ButtonLoading"
import { zodResolver } from "@hookform/resolvers/zod"
import { optValidationSchema } from "@/lib/zodSchema"
import { z } from "zod"

type ForgetVerifyOptProps = {
    setOpenTab: React.Dispatch<React.SetStateAction<openTabType>>
}

const ForgetVerifyOpt = ({ setOpenTab }: ForgetVerifyOptProps) => {

    const form = useForm<z.infer<typeof optValidationSchema>>({
        resolver: zodResolver(optValidationSchema),
        defaultValues: {
            otp: ""
        }
    })

    async function onSubmit(value: z.infer<typeof optValidationSchema>) {

        const result = await very

    }

    return (
        <Card className="shadow-none w-sm">
            <CardContent className="text-center space-y-4">
                {
                    loading ?
                        <LoaderOne />
                        :
                        null
                }
                <CardTitle className="text-2xl font-extrabold tracking-tight">
                    Verify Your Email
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                    We've sent a 6-digit verification code to <span className="font-medium">{email}</span>.
                    Enter the code below to complete the verification.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center justify-center">
                                    <FormLabel className="text-sm font-medium mb-1">
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
                            text="Verify OTP"
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

export default ForgetVerifyOpt
