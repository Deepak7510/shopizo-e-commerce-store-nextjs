import React from 'react'
import { PulseLoader } from 'react-spinners'

const LoaderOne = () => {
    return (
        <div className='flex z-10 justify-center items-center h-screen w-full absolute inset-0'>
            <PulseLoader color='#6D28D9' />
        </div>
    )
}

export default LoaderOne
