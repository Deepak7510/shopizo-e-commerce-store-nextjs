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
import { TypesOfDeleteType } from "@/types/global.types";
import CommonDataTable from "@/components/application/admin/CommonDataTable";
import { tableAction } from "@/components/application/admin/tableAction";
import { ColumnDef } from "@tanstack/react-table";
import { TypesOfSubcategoryData } from "@/types/admin.subcategories.types";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: "",
        title: "Subcategories",
    },
];

export const subCategoriesColumns: ColumnDef<
    TypesOfSubcategoryData,
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
            accessorKey: "category.name",
            header: "Category",
            cell: ({ row }) => row.original.category?.name || "-",
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

const SubcategoriesPage = () => {
    const [deleteType, setDeleteType] = useState<TypesOfDeleteType>("SD");
    const deleteEndPoint = "/api/admin/subcategories/delete";
    const fetchDataURL = "/api/admin/subcategories";
    const queryKey = "subcategories";

    return (
        <div className="space-y-3">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-sm shadow-none py-3 gap-2.5">
                <CardHeader>
                    <div className="flex justify-between">
                        <h1 className="text-xl text-violet-700 font-semibold">Subcategories</h1>
                        <Button asChild size={"sm"}>
                            <Link href={adminRoutes.subcategories.addSubcategory}>
                                <Plus />
                                Add Subcategory
                            </Link>
                        </Button>
                    </div>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <CommonDataTable<TypesOfSubcategoryData, unknown>
                        setDeleteType={setDeleteType}
                        columns={subCategoriesColumns}
                        editEndPoint={adminRoutes.subcategories.editSubcategory}
                        actions={tableAction}
                        queryKey={queryKey}
                        deleteEndPoint={deleteEndPoint}
                        deleteType={deleteType}
                        fetchDataURL={fetchDataURL}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default SubcategoriesPage;
