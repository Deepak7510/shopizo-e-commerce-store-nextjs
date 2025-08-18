"use client"
import useFetch from '@/hooks/useFetch'
import { BadgeCent, FolderKanban, LayoutGrid, PackageSearch, Shirt, ShoppingCart, Tag, User2 } from 'lucide-react';
import React from 'react'
import QuickButton from './QuickButton';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardCount = () => {

    const { data, error, loading } = useFetch("/api/admin/dashboard/count", {}, []);
    const count = data?.data

    if (error) {
        return <div>{error.message || "Somthing went worng"}</div>
    }

    return (
        <div className='grid md:grid-cols-4 sm:grid-cols-3 gap-8'>
            {loading ?

                Array(12).fill(null).map((_, index) => {
                    return <Skeleton key={index} className='w-full h-15 border' />
                })

                :
                <>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-green-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Brands</div>
                            <div className='font-medium text-md'>{count?.brandsCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-green-400 text-white'>
                            <BadgeCent />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-blue-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Categories</div>
                            <div className='font-medium text-md'>{count?.categoriesCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-blue-400 text-white'>
                            <FolderKanban />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-yellow-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Subcategories</div>
                            <div className='font-medium text-md'>{count?.subcategoriesCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-yellow-400 text-white'>
                            <LayoutGrid />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-cyan-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Products</div>
                            <div className='font-medium text-md'>{count?.productsCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-cyan-400 text-white'>
                            <Shirt />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-red-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Product Variants</div>
                            <div className='font-medium text-md'>{count?.productVariantCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-red-400 text-white'>
                            <PackageSearch />                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-purple-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Coupons</div>
                            <div className='font-medium text-md'>{count?.couponsCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-purple-400 text-white'>
                            <Tag />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-s-teal-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Orders</div>
                            <div className='font-medium text-md'>{count?.productsCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-teal-400 text-white'>
                            <ShoppingCart />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center border py-2 px-4 rounded-md border-l-4 border-l-pink-400'>
                        <div>
                            <div className='text-md text-muted-foreground'>Total Customers</div>
                            <div className='font-medium text-md'>{count?.userCount}</div>
                        </div>
                        <div className='p-2 rounded-full bg-pink-400 text-white'>
                            <User2 />
                        </div>
                    </div>
                    <QuickButton />
                </>
            }
        </div>
    )
}

export default DashboardCount
