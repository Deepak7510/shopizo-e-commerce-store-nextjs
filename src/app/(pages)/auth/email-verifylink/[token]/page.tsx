"use client"
import LoaderOne from '@/components/application/common/LoaderOne';
import { Button } from '@/components/ui/button';
import { authRoutes, userRoutes } from '@/lib/client/routes';
import emailVerifylinkService from '@/services/client/auth/emailVerifylinkService';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'


interface EmailVerifyPageProps {
    params: Promise<{ token: string }>
}

const EmailVerifyPage: React.FC<EmailVerifyPageProps> = ({ params }) => {
    const { token } = use(params);
    const router = useRouter();
    const [successStatus, setSuccessStatus] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function checkEmailVerification() {
            setLoading(true)
            const result = await emailVerifylinkService(token);
            setSuccessStatus(result.success);
            setLoading(false);
            setMessage(result.message);
            if (result.success) {
                setTimeout(() => {
                    sessionStorage.setItem("accessToken", JSON.stringify(result.data.accessToken));
                    setTimeout(() => {
                        window.location.href = userRoutes.home;
                    }, 500);
                }, 0);
            }
        }
        checkEmailVerification()
    }, [token])

    return (
        <div className='space-y-3'>
            {loading ?
                <LoaderOne />
                :
                <p className={`text-2xl text-center font-bold ${successStatus ? 'text-green-700' : 'text-red-700'}`}>{message}</p>
            }
            <div className='flex justify-center'>
                {!successStatus && !loading ?
                    <Button size={'sm'} onClick={() => router.push(authRoutes.login)} className='w-fit'>Go to Login Page</Button>
                    : null
                }
            </div>
        </div>
    )
}

export default EmailVerifyPage
