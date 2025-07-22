import React, { ReactElement } from "react"

const UserLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return <>
        <main>
            {children}
        </main>
    </>
}

export default UserLayout
