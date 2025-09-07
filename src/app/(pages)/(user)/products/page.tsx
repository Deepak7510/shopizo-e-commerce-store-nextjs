"use client"
import BreadCrumb, { breadcrumbListType } from '@/components/application/common/BreadCrumb'
import FilterSidebar from '@/components/application/user/FilterSidebar'
import { userRoutes } from '@/lib/client/routes';
import React from 'react'

const breadcrumbList: breadcrumbListType[] = [
    {
        href: userRoutes.home,
        title: "Home",
    },
    {
        href: "",
        title: "Products",
    },
];


const ShopProductsPage = () => {
    return (
        <div>
            <div className='w-full flex flex-col justify-center ps-5 h-[110px] object-cover bg-center bg-[url(https://res.cloudinary.com/ds9m8zh8a/image/upload/v1756885999/20250903_1320_Elegant_Floral_Breadcrumbs_simple_compose_01k478sjt3efzsx9px87p4hss1_d6lrub.png)]'>
                <div>
                    <h2 className='font-bold text-2xl'>Products</h2>
                    <BreadCrumb breadcrumbList={breadcrumbList} />
                </div>
            </div>
            <div className="px-3 md:px-25">
                <div className='flex w-full'>
                    <FilterSidebar />
                    <main className='h-[200vh]'>

                    </main>
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage
