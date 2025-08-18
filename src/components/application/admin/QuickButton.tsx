import { adminRoutes } from '@/lib/client/routes'
import React from 'react'
import {
    Shirt,
    BadgeCent,
    FolderKanban,
    LayoutGrid,
} from "lucide-react";
import Link from 'next/link';

export type TypeOfQuickList = {
    title: string
    url: string
    icon: React.ReactNode
    gradient: string
}

export const quickLinkList: TypeOfQuickList[] = [
    {
        title: "Add Brand",
        url: adminRoutes.brands.addBrands,
        icon: <BadgeCent />,
        gradient: "bg-gradient-to-r from-green-400 to-emerald-500",

    },
    {
        title: "Add Category",
        url: adminRoutes.categories.addCategory,
        icon: <FolderKanban />,
        gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
    },
    {
        title: "Add Subcategory",
        url: adminRoutes.subcategories.addSubcategory,
        icon: <LayoutGrid />,
        gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
        title: "Add Product",
        url: adminRoutes.products.addProduct,
        icon: <Shirt />,
        gradient: "bg-gradient-to-r from-cyan-400 to-cyan-500",
    }
]

const QuickButton = () => {
    return (
        <>
            {quickLinkList.map((item, index) => (
                <Link
                    key={index}
                    href={item.url}
                    className={`w-full flex justify-between items-center border py-2 px-4 rounded-md ${item.gradient}`}
                >
                    <div>
                        <div className="text-md text-white">{item.title}</div>
                    </div>
                    <div className={`p-2 rounded-full text-white border ${item.gradient}`}>
                        {item.icon}
                    </div>
                </Link >
            ))}
        </>
    )
}

export default QuickButton
