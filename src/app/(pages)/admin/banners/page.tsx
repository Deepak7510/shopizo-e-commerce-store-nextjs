"use client";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import { ArrowUpDown, MoreVertical, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { TypeOfDeleteType } from "@/types/global.types";
import CommonDataTable from "@/components/application/admin/CommonDataTable";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditAction from "@/components/application/admin/EditAction";
import DeleteAction from "@/components/application/admin/DeleteAction";
import { TypeOfBannerData } from "@/types/admin.banners.types";
import { Card } from "@/components/ui/card";
import { dateResolver, stringShorter } from "@/lib/client/helperFunction";
import { Badge } from "@/components/ui/badge";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: "",
        title: "Banners",
    },
];

export const bannersColumns: ColumnDef<
    TypeOfBannerData,
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
            cell: ({ row }) => {
                return <span>{stringShorter(row.original.name, 3)}</span>
            }
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
            cell: ({ row }) => {
                return <span>{stringShorter(row.original.title, 3)}</span>
            },
        },
        {
            accessorKey: "subtitle",
            header: "Sub title",
            cell: ({ row }) => {
                return <span>{stringShorter(row.original.subtitle, 3)}</span>
            }
        },
        {
            accessorKey: "buttonName",
            header: "Button name",
        },
        {
            accessorKey: "link",
            header: "Link",
            cell: ({ row }) => {
                const link = row.original.link;
                return link ? <a className="underline text-violet-700" href={row.original.link || "#"} target="_blank">link</a> : "-"
            }
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                return <span>{row.original.type.toUpperCase()}</span>
            }
        },
        {
            accessorKey: "bannerImage.secure_url",
            header: "Banner image",
            cell: ({ row }) => {
                return < div className="h-10 w-16 relative rounded overflow-hidden">
                    <Image
                        src={row.original.bannerImage.secure_url}
                        alt={row.original.bannerImage.alt || "banner image"}
                        className="object-cover w-full h-full"
                        width={100}
                        height={100}
                    />
                </div>
            }
        },
        {
            accessorKey: "startDate",
            header: "Start date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("startDate"));
                return (
                    <span>
                        {dateResolver(date)}
                    </span>
                );
            },
        },
        {
            accessorKey: "endDate",
            header: "End date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("endDate"));
                const variant = new Date(Date.now()) >= date ? "destructive" : "default"
                return (
                    <Badge variant={variant}>
                        {dateResolver(date)}
                    </Badge>
                );
            },
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
    ];


const Action = React.memo<{
    row: Row<TypeOfBannerData>;
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
                    deleteType === "SD" &&
                    <EditAction row={row} editEndPoint={adminRoutes.banners.editBanner} />
                }
                <DeleteAction row={row} handleDeleteAlert={handleDeleteAlert} deleteType={deleteType} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

const BannersPage = () => {
    const [deleteType, setDeleteType] = useState<TypeOfDeleteType>("SD");
    const deleteEndPoint = "/api/admin/banners/delete";
    const fetchDataURL = "/api/admin/banners";
    const queryKey = "banners";

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md px-3 py-2 gap-0 shadow-none">
                <div className="flex justify-between mb-1">
                    <h1 className="text-xl text-violet-700 font-semibold">Banners</h1>
                    <Button asChild size={"sm"}>
                        <Link href={adminRoutes.banners.addBanner}>
                            <PlusCircle />
                            Add Banner
                        </Link>
                    </Button>
                </div>
                <Separator />
                <CommonDataTable<TypeOfBannerData, unknown>
                    setDeleteType={setDeleteType}
                    columns={bannersColumns}
                    queryKey={queryKey}
                    deleteEndPoint={deleteEndPoint}
                    deleteType={deleteType}
                    fetchDataURL={fetchDataURL}
                    Action={Action}
                />
            </Card>
        </div>
    );
};

export default BannersPage;
