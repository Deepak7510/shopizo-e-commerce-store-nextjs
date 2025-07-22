"use client"
import { Card, CardContent } from "@/components/ui/card";
import { emailValidationSchema } from "@/lib/zodSchema";
import { resendOtpService } from "@/services/auth/resendOptService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ButtonLoading } from "@/components/application/common/ButtonLoading";
import { useRouter } from "next/navigation";
import { authRoutes } from "@/lib/client/routes";
import Link from "next/link";
import ApplicationLogo from "@/components/application/common/ApplicationLogo";

const ForgetPasswordPage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof emailValidationSchema>>({
        resolver: zodResolver(emailValidationSchema),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(value: z.infer<typeof emailValidationSchema>) {
        const result = await resendOtpService({ email: value.email });
        if (result.success) {
            toast.success(result.message)
            form.reset();
            router.push(authRoutes.forgetPasswordVerifyOtp(value.email));
        } else {
            toast.error(result.message)
        }
    }

    return (
        <Card className='shadow-none w-sm'>
            <CardContent className="space-y-3">
                <div className="flex flex-col items-center gap-1">
                    <ApplicationLogo />
                    <h2 className='text-2xl font-bold text-violet-700'> Forgot Password</h2>
                    <p className="text-muted-foreground text-xs font-medium">
                        Enter your email to receive a verification code
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonLoading className="w-full" text="Send OTP" loading={form.formState.isSubmitting} type="submit" />
                    </form>
                </Form>
                <div className="text-center">
                    <p>Don't have an account?</p>
                    <Link
                        className="text-violet-700 underline"
                        href={authRoutes.register}
                    >
                        Create account
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default ForgetPasswordPage






