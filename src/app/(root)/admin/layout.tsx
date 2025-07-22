import { AppSidebar } from '@/components/application/admin/AppSidebar'
import Footer from '@/components/application/admin/Footer'
import Header from '@/components/application/admin/Header'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const AdminLayout = ({ children }: Readonly<{
    children: React.ReactNode
}>) => {
    return <SidebarProvider>
        <AppSidebar />
        <main className='w-full min-h-screen'>
            <Header />
            <div className='p-2'>
                {children}
            </div>
            <Footer />
        </main>
    </SidebarProvider>
}

export default AdminLayout
