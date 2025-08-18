"use client"

import DashboardCount from '@/components/application/admin/DashboardCount';
import { LatestOrder } from '@/components/application/admin/LatestOrder';
import { LatestReview } from '@/components/application/admin/LatestReview';
import { OrderOverviewChart } from '@/components/application/admin/OrderOverviewChart';
import { OrderStatusPieChart } from '@/components/application/admin/OrderStatusPieChart';
import React from 'react'

const DashboardPage = () => {
    return (
        <div className='my-4 space-y-5'>
            <DashboardCount />
            <div className='flex flex-wrap md:flex-nowrap gap-5'>
                <div className='w-full md:w-[70%]'>
                    < OrderOverviewChart />
                </div>
                <div className='w-full md:w-[30%]'>
                    <OrderStatusPieChart />
                </div>
            </div>

            <div className='flex flex-wrap md:flex-nowrap gap-5'>
                <div className='w-full md:w-[70%]'>
                    <LatestOrder />
                </div>
                <div className='w-full md:w-[30%]'>
                    <LatestReview />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
