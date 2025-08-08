import Image from 'next/image'
import React from 'react'

import applicationLightLogo from '../../../../public/applicationLightLogo.svg'
import applicationDarkLogo from '../../../../public/applicationDarkLogo.svg'
import Link from 'next/link'
import { userRoutes } from '@/lib/client/routes'

const ApplicationLogo = () => {
    return (<>
        <Link className='dark:hidden' href={userRoutes.home}> <Image src={applicationLightLogo} alt='Application-logo' /></Link>
        <Link className='hidden dark:block' href={userRoutes.home}> <Image src={applicationDarkLogo} alt='Application-logo' /></Link>
    </>
    )
}

export default ApplicationLogo
