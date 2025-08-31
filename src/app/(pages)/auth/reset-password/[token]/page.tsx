"use client"
import ApplicationLogo from '@/components/application/common/ApplicationLogo'
import { ButtonLoading } from '@/components/application/common/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authRoutes } from '@/lib/client/routes'
import { resetPasswordService } from '@/services/client/auth/resetPasswordService'
import { TypeOfResetPasswordInput } from '@/types/auth.types'
import { resetPasswordZodSchema } from '@/zodSchema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


type ResetPassowrdPageProps = {
    params: Promise<{ token: string }>
}

const ResetPassowrdPage: React.FC<ResetPassowrdPageProps> = ({ params }) => {
    const router = useRouter()
    const paramsValue = use(params);
    const token = paramsValue.token;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const form = useForm<TypeOfResetPasswordInput>({
        resolver: zodResolver(resetPasswordZodSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(value: TypeOfResetPasswordInput) {

        if (!token) {
            toast.error("Token is required to reset password");
            return
        }

        const result = await resetPasswordService({ ...value, token });
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        return router.push(authRoutes.login);
    }

    return (
        <Card className="w-sm shadow-none">
            <CardContent className="space-y-3">
                <div className="flex justify-center items-center gap-1 flex-col">
                    <ApplicationLogo />
                    <h2 className="text-2xl font-bold  text-violet-700">Reset Password</h2>
                    <p className="text-center text-xs text-muted-foreground font-medium">
                        Reset your password by filling out the form below
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your new password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword((pre) => !pre)}
                                            variant={"icon" as any}
                                            className="absolute top-[50%] right-2 translate-y-[-50%]"
                                        >
                                            {showPassword ? (
                                                <EyeClosed className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showconfirmPassword ? "text" : "password"}
                                                placeholder="Enter your confirm password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((pre) => !pre)}
                                            variant={"icon" as any}
                                            className="absolute top-[50%] right-2 translate-y-[-50%]"
                                        >
                                            {showconfirmPassword ? (
                                                <EyeClosed className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonLoading
                            className="w-full"
                            type="submit"
                            loading={form.formState.isSubmitting}
                            text={"Save"}
                        />
                    </form>
                </Form>
                <p className="text-xs text-center text-muted-foreground">
                    This page is valid for 15 minutes. For your security.
                </p>
            </CardContent>
        </Card>
    )
}

export default ResetPassowrdPage
