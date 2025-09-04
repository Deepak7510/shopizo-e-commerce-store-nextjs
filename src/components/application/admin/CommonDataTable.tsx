"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { TypeOfDeleteType } from "@/types/global.types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArchiveRestore,
    DatabaseIcon,
    Recycle,
    RotateCw,
    Trash,
} from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";
import axiosInstance from "@/lib/client/axios";
import TableDataSkeleton from "./TableDataSkeleton";
import { Card } from "@/components/ui/card";

type CommonDataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    queryKey: string;
    deleteEndPoint: string;
    fetchDataURL: string;
    deleteType: TypeOfDeleteType;
    setDeleteType: React.Dispatch<SetStateAction<TypeOfDeleteType>>;
    Action: React.FC<{
        row: Row<TData>;
        deleteType: TypeOfDeleteType;
        handleDeleteAlert: (
            getDeleteType: TypeOfDeleteType,
            getDeleteIdList?: string[]
        ) => void;
    }>;
};

export function CommonDataTable<TData, TValue>({
    queryKey,
    deleteEndPoint,
    fetchDataURL,
    deleteType,
    setDeleteType,
    columns,
    Action,
}: CommonDataTableProps<TData, TValue>) {
    const queryClient = useQueryClient();
    const deleteMutation = useDeleteMutation(deleteEndPoint);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [searchValue, setSearchValue] = useState<string>("");
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const [alertDecsMessage, setAlertDecsMessage] = useState<string>("");

    const [deleteActionType, setDeleteActionType] =
        useState<TypeOfDeleteType | null>(null);
    const [deleteIdList, setDeleteIdList] = useState<string[]>([]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setGlobalFilter(searchValue);
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchValue]);



    async function fetchData(
        fetchDataURL: string,
        page: number,
        limit: number,
        deleteType: TypeOfDeleteType,
        sortby: string,
        order: string
    ): Promise<TypeOfAxoisResponse> {
        try {
            const response = await axiosInstance.get(
                `${fetchDataURL}?page=${page}&limit=${limit}&deleteType=${deleteType}&globalFilter=${globalFilter}&sortby=${sortby}&order=${order}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Axios Error", error);
            return error?.response?.data;
        }
    }

    const { data, status, error } = useQuery({
        queryKey: [
            queryKey,
            pagination,
            deleteType,
            fetchDataURL,
            globalFilter,
            sorting,
        ],
        queryFn: () => {
            const page = pagination?.pageIndex;
            const limit = pagination?.pageSize;
            let sortby = "createdAt";
            let order = "desc";
            if (sorting.length > 0) {
                sortby = sorting[0]?.id;
                order = sorting[0]?.desc ? "desc" : "asc";
            }
            return fetchData(fetchDataURL, page, limit, deleteType, sortby, order);
        },
        placeholderData: keepPreviousData,
    });

    const table = useReactTable<TData>({
        data: data?.data.dataList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        autoResetPageIndex: false,
        manualPagination: true,
        manualSorting: true,
        rowCount: data?.data.totalRow,
        pageCount: data?.data.totalPage,
        state: {
            rowSelection,
            sorting,
            pagination,
        },
    });

    if (status === "pending") {
        return <TableDataSkeleton />
    }

    if (error) {
        return (
            <div className="text-red-700 font-medium text-lg text-center py-10">
                Somthing went worng
            </div>
        );
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    function handleDeleteAlert(
        getDeleteType: TypeOfDeleteType,
        getDeleteIdList?: string[]
    ) {
        let getDeleteIdListData: string[] = [];
        if (getDeleteIdList && getDeleteIdList?.length > 0) {
            getDeleteIdListData = getDeleteIdList;
        } else {
            const dataIndexs = Object.keys(rowSelection);
            getDeleteIdListData = data?.data.dataList
                .filter((_: any, index: number) => dataIndexs.includes(String(index)))
                .map((dataItem: any) => dataItem._id);
        }
        setOpenDeleteAlert(true);
        setDeleteIdList(getDeleteIdListData);
        setDeleteActionType(getDeleteType);
        let alertMessage = "";
        switch (getDeleteType) {
            case "PD":
                alertMessage = "Are you sure you want to delete this permanently?";
                break;
            case "SD":
                alertMessage = "Are you sure you want to soft delete this data?";
                break;
            case "RSD":
                alertMessage = "Are you sure you want to restore this data?";
                break;
            default:
                alertMessage = "Unknown delete action.";
        }
        setAlertDecsMessage(alertMessage);
    }

    function handleDelete() {
        deleteMutation.mutate(
            { selectedIdList: deleteIdList, deleteType: deleteActionType! },
            {
                onSuccess(data) {
                    if (data.success) {
                        toast.success(data.message);
                        setRowSelection({});
                        queryClient.invalidateQueries({ queryKey: [queryKey] });
                    }
                },
                onError(error: any) {
                    toast.error(error.message || "Something went wrong");
                },
            }
        );
    }

    function handleClosedeleteAlert() {
        setDeleteActionType(null);
        setDeleteIdList([]);
        setOpenDeleteAlert(false);
    }

    function handleSetDeleteType(getDeletetype: TypeOfDeleteType) {
        setRowSelection({});
        setDeleteType(getDeletetype);
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });
        setGlobalFilter("");
        setSorting([]);
        setSearchValue("");
    }

    return (
        <div className="space-y-4">
            <AlertDialog
                open={openDeleteAlert}
                onOpenChange={() => handleClosedeleteAlert()}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-700">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>{alertDecsMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex justify-between my-2 gap-2">
                <div>
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearch}
                        className="md:w-[350px] shadow-none rounded-full"
                    />
                </div>
                <>
                    {deleteType === "SD" ? (
                        <div className="flex justify-between gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={Object.keys(rowSelection).length <= 0}
                                        onClick={() => handleDeleteAlert("SD")}
                                        variant={"secondary"}
                                        size={"icon"}
                                    >
                                        <Trash />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium">Move to Trash</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={sorting.length <= 0}
                                        onClick={() => table.resetSorting()}
                                        size={"icon"}
                                        variant={"secondary"}
                                    >
                                        <RotateCw />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium"> Reset Sorting</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => handleSetDeleteType("PD")}
                                        variant={"secondary"}
                                        size={"icon"}
                                    >
                                        <Recycle />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium">View Trash</p>
                                </TooltipContent>
                            </Tooltip>

                        </div>
                    ) : (
                        <div className="flex justify-between gap-3">
                            <>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            disabled={Object.keys(rowSelection).length <= 0}
                                            onClick={() => handleDeleteAlert("PD")}
                                            variant={"secondary"}
                                            size={"icon"}
                                        >
                                            <Trash />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="font-medium">Delete Permanently</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            disabled={Object.keys(rowSelection).length <= 0}
                                            onClick={() => handleDeleteAlert("RSD")}
                                            variant={"secondary"}
                                            size={"icon"}
                                        >
                                            <ArchiveRestore />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="font-medium">Restore</p>
                                    </TooltipContent>
                                </Tooltip>
                            </>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => handleSetDeleteType("SD")}
                                        variant={"secondary"}
                                        size={"icon"}                                    >
                                        <DatabaseIcon />

                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p className="font-medium"> Show Records</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </>
            </div>
            <Card className="rounded-md w-full p-0 shadow-none overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="font-medium" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                                <TableHead>Action</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Action deleteType={deleteType} row={row} handleDeleteAlert={handleDeleteAlert} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-12 font-medium text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
            <div className="flex justify-between px-2">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} rows selected.
                </div>
                <div className="flex gap-2 md:gap-6">
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                            table.setPageIndex(0);
                        }}
                    >
                        <SelectTrigger className="!h-8 !min-h-[32px] px-2 text-sm">
                            <SelectValue className="w-[180px]" placeholder="Page Size" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    disabled={table.getRowCount() < pageSize}
                                    key={pageSize}
                                    value={String(pageSize)}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex gap-1">
                        <Button
                            size={"icon"}
                            className="size-8"
                            variant={"outline"}
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {"<<"}
                        </Button>
                        <Button
                            size={"icon"}
                            className="size-8"
                            variant={"outline"}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {"<"}
                        </Button>
                        <Button
                            size={"icon"}
                            className="size-8"
                            variant={"outline"}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {">"}
                        </Button>
                        <Button
                            size={"icon"}
                            className="size-8"
                            variant={"outline"}
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {">>"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommonDataTable;
