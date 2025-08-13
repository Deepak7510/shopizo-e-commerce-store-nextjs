"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import { ArrowUpDown, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { TypeOfDeleteType } from "@/types/global.types";
import CommonDataTable from "@/components/application/admin/CommonDataTable";
import { tableAction } from "@/components/application/admin/tableAction";
import { ColumnDef } from "@tanstack/react-table";
import { TypeOfProductData } from "@/types/admin.products.types";
import Image from "next/image";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: "",
        title: "Products",
    },
];

export const ProductsColumns: ColumnDef<
    TypeOfProductData,
    unknown
>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            accessorKey: "brand.name",
            header: "Brand",
            cell: ({ row }) => row.original.brand?.name || "-",
        },

        {
            accessorKey: "category.name",
            header: "Category",
            cell: ({ row }) => row.original.category?.name || "-",
        },
        {
            accessorKey: "subcategory.name",
            header: "Subcategory",
            cell: ({ row }) => row.original.subcategory?.name || "-",
        },
        {
            accessorKey: "media",
            header: "Media",
            cell: ({ row }) => {

                const media = row.original.media
                return <div className="flex gap-1">
                    {
                        media && media.length > 0 && media.map((mediaItem, index) =>
                            < div key={index} className="h-12 w-10 relative rounded overflow-hidden">
                                <Image
                                    src={mediaItem.secure_url}
                                    alt={"Selected Image"}
                                    className="object-cover w-full h-full"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )
                    }

                </div>
            }
        },

        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                const date = new Date(row.getValue("createdAt"));
                return (
                    <span>
                        {date.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                );
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => {
                const date = new Date(row.getValue("updatedAt"));
                return (
                    <span>
                        {date.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                );
            },
        },
    ];

const ProductPage = () => {
    const [deleteType, setDeleteType] = useState<TypeOfDeleteType>("SD");
    const deleteEndPoint = "/api/admin/products/delete";
    const fetchDataURL = "/api/admin/products";
    const queryKey = "products";

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <div className="border rounded p-2">
                <div className="flex justify-between mb-2">
                    <h1 className="text-xl text-violet-700 font-semibold">Products</h1>
                    <Button asChild size={"sm"}>
                        <Link href={adminRoutes.products.addProduct}>
                            <Plus />
                            Add Product
                        </Link>
                    </Button>
                </div>
                <Separator />
                <CommonDataTable<TypeOfProductData, unknown>
                    setDeleteType={setDeleteType}
                    columns={ProductsColumns}
                    editEndPoint={adminRoutes.products.editProduct}
                    actions={tableAction}
                    queryKey={queryKey}
                    deleteEndPoint={deleteEndPoint}
                    deleteType={deleteType}
                    fetchDataURL={fetchDataURL}
                />
            </div>
        </div>
    );
};

export default ProductPage;
