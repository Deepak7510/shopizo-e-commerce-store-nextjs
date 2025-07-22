import Image from 'next/image'
import React from 'react'

import applicationLogoImage from '../../../../public/applicationLogo.svg'
import Link from 'next/link'
import { usersRoutes } from '@/lib/client/routes'

const ApplicationLogo = () => {
    return (
        <Link href={usersRoutes.home}> <Image src={applicationLogoImage} alt='Application-logo' /></Link>
    )
}

export default ApplicationLogo
