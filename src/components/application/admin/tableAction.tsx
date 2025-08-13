import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeOfDeleteType } from "@/types/global.types";
import { Archive, ArchiveRestore, Edit, MoreHorizontal, MoreVertical, Trash, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

export const tableAction = (
    editEndPoint: (id: string) => string,
    row: any,
    deleteType: TypeOfDeleteType,
    handleDeleteAlert: (
        getDeleteType: TypeOfDeleteType,
        getDeleteIdList?: string[]
    ) => void
): React.ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {deleteType == "SD" ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={editEndPoint(row.original._id)}>
                                <Edit className="w-4 h-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant={"destructive"}
                            onClick={() => handleDeleteAlert("SD", [row.original._id])}
                        >
                            <Trash />
                            Move Into Trash
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem
                            onClick={() => handleDeleteAlert("RSD", [row.original._id])}
                        >
                            <ArchiveRestore />
                            Restore
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant={"destructive"}
                            onClick={() => handleDeleteAlert("PD", [row.original._id])}
                        >
                            <Trash
                            />
                            Delete Permanently
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu >
    );
};
