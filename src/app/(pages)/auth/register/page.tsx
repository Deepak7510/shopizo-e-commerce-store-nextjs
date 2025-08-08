'use client';
import ApplicationLogo from "@/components/application/common/ApplicationLogo";
import { ButtonLoading } from "@/components/application/common/ButtonLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authRoutes } from "@/lib/client/routes";
import registerService from "@/services/client/auth/registerService";
import { TypesOfRegisterInput } from "@/types/auth.types";
import { registerZodSchema } from "@/zodSchema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const form = useForm<TypesOfRegisterInput>({
        resolver: zodResolver(registerZodSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    async function onSubmit(data: TypesOfRegisterInput) {
        const result = await registerService(data);
        if (!result.success) {
            toast.error(result.message)
            return;
        }
        form.reset();
        return router.push(authRoutes.checkEmail(data.email));
    }

    return (
        <Card className="shadow-none w-sm">
            <CardContent className="space-y-3">
                <div className="flex justify-center items-center gap-1 flex-col">
                    <ApplicationLogo />
                    <h2 className="text-2xl font-bold text-violet-700">Create Your Account</h2>
                    <p className="text-center text-muted-foreground text-xs font-medium">
                        Create your account by filling out the form below
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
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
                        <ButtonLoading
                            className="w-full"
                            type="submit"
                            loading={form.formState.isSubmitting}
                            text={"Register"}
                        />
                    </form>
                </Form>
                <div className="flex justify-center items-center gap-1">
                    <p>Already have an account ? </p>
                    <Link
                        className="text-violet-700 underline"
                        href={authRoutes.login}
                    >
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegisterPage;
