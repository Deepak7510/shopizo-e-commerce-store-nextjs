import React from 'react'

const loyout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex justify-center items-center w-full min-h-screen'>
            {children}
        </div>
    )
}

export default loyout
