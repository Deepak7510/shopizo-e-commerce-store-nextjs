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
import { TypeOfBrandData } from "@/types/admin.brands.types";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: "",
        title: "Brands",
    },
];

export const brandsColumns: ColumnDef<TypeOfBrandData, unknown>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
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

const BrandsPage = () => {
    const [deleteType, setDeleteType] = useState<TypeOfDeleteType>("SD");
    const deleteEndPoint = "/api/admin/brands/delete";
    const fetchDataURL = "/api/admin/brands";
    const queryKey = "brands";

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <div className=" border rounded p-2">
                <div className="flex justify-between mb-2">
                    <h1 className="text-xl text-violet-700 font-semibold">Brands</h1>
                    <Button asChild size={"sm"}>
                        <Link href={adminRoutes.brands.addBrands}>
                            <Plus />
                            Add Brand
                        </Link>
                    </Button>
                </div>
                <Separator />
                <CommonDataTable<TypeOfBrandData, unknown>
                    setDeleteType={setDeleteType}
                    columns={brandsColumns}
                    editEndPoint={adminRoutes.brands.editBrands}
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

export default BrandsPage;
