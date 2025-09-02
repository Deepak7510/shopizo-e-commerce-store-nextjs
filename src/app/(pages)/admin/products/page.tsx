"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import { ArrowUpDown, MoreVertical, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { TypeOfDeleteType } from "@/types/global.types";
import CommonDataTable from "@/components/application/admin/CommonDataTable";
import { ColumnDef, Row } from "@tanstack/react-table";
import { TypeOfProductData } from "@/types/admin.products.types";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditAction from "@/components/application/admin/EditAction";
import DeleteAction from "@/components/application/admin/DeleteAction";
import { Card } from "@/components/ui/card";
import { dateResolver } from "@/lib/client/helperFunction";

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
            accessorKey: "mrp",
            header: "MRP",
        },
        {
            accessorKey: "sellingPrice",
            header: "Selling price",
        },
        {
            accessorKey: "discountPercentage",
            header: "Discount",
            cell: ({ row }) => {
                return <span>{row.original.discountPercentage || 0} %</span>
            }
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
                        {dateResolver(date)}
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
                        {dateResolver(date)}
                    </span>
                );
            },
        },
    ];


const Action = React.memo<{
    row: Row<TypeOfProductData>;
    deleteType: TypeOfDeleteType;
    handleDeleteAlert: (
        getDeleteType: TypeOfDeleteType,
        getDeleteIdList?: string[]
    ) => void;
}>(({ row, deleteType, handleDeleteAlert }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    deleteType === "SD" && <EditAction row={row} editEndPoint={adminRoutes.products.editProduct} />
                }
                <DeleteAction row={row} handleDeleteAlert={handleDeleteAlert} deleteType={deleteType} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

Action.displayName = "Action"


const ProductPage = () => {
    const [deleteType, setDeleteType] = useState<TypeOfDeleteType>("SD");
    const deleteEndPoint = "/api/admin/products/delete";
    const fetchDataURL = "/api/admin/products";
    const queryKey = "products";

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">Products</h1>
                    <Button asChild size={"sm"}>
                        <Link href={adminRoutes.products.addProduct}>
                            <PlusCircle />
                            Add Product
                        </Link>
                    </Button>
                </div>
                <Separator />
                <CommonDataTable<TypeOfProductData, unknown>
                    setDeleteType={setDeleteType}
                    columns={ProductsColumns}
                    queryKey={queryKey}
                    deleteEndPoint={deleteEndPoint}
                    deleteType={deleteType}
                    fetchDataURL={fetchDataURL}
                    Action={Action}
                />
            </Card>
        </div >
    );
};

export default ProductPage;
