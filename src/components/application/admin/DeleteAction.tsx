"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TypeOfDeleteType } from "@/types/global.types"
import { ArchiveRestore, Trash } from "lucide-react"

const DeleteAction = ({ deleteType, row, handleDeleteAlert }: {
    deleteType: TypeOfDeleteType, row: any, handleDeleteAlert: (
        getDeleteType: TypeOfDeleteType,
        getDeleteIdList?: string[]
    ) => void;
}) => {
    return <>
        {deleteType == "SD" ? (
            <>
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
    </>
}

export default DeleteAction
