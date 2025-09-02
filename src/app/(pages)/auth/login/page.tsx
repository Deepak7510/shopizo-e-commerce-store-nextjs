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
import loginService from "@/services/client/auth/loginService";
import { TypeOfLoginInput } from "@/types/auth.types";
import { loginZodSchema } from "@/zodSchema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<TypeOfLoginInput>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: TypeOfLoginInput) {
    const result = await loginService(data);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    form.reset();
    if (result.resType === "EMAIL_VERIFICATION") return router.push(authRoutes.checkEmail(data.email))
    return router.push(authRoutes.verifyOtp(data.email))
  }

  return (
    <Card className="w-sm shadow-none">
      <CardContent className="space-y-3">
        <div className="flex justify-center items-center gap-1 flex-col">
          <ApplicationLogo />
          <h2 className="text-2xl font-bold text-violet-700">Login to Your Account</h2>
          <p className="text-center text-muted-foreground text-xs font-medium">
            Login to your account by filling out the form below
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
              text={"Login"}
            />
          </form>
        </Form>
        <div className="flex flex-col items-center gap-1">
          <Link href={authRoutes.forgetPassword} className="text-violet-700 underline">
            Forgot password?
          </Link>
          <div className="flex justify-center gap-1">
            <p>Don&apos;t have an account?</p>
            <Link
              className="text-violet-700 underline"
              href={authRoutes.register}
            >
              Create account
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
