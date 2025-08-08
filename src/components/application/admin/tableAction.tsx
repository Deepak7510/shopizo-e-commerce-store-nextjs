import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TypesOfDeleteType } from "@/types/global.types"
import { Edit, MoreHorizontal, Trash, Undo } from "lucide-react"
import Link from "next/link"
import React from "react"

export const tableAction = (editEndPoint: (id: string) => string, row: any, deleteType: TypesOfDeleteType, handleDeleteAlert: (getDeleteType: TypesOfDeleteType, getDeleteIdList?: string[]) => void): React.ReactElement => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {deleteType == "SD" ? (
                <>
                    <DropdownMenuItem asChild>
                        <Link href={editEndPoint(row.original._id)}>
                            <Edit className='w-4 h-4' />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-700 hover:text-red-700!"
                        onClick={() => handleDeleteAlert("SD", [row.original._id])}
                    >
                        <Trash className="text-red-700" />
                        Move Into Trash
                    </DropdownMenuItem>
                </>
            ) : (
                <>
                    <DropdownMenuItem
                        onClick={() => handleDeleteAlert("RSD", [row.original._id])}
                        className="text-green-700 hover:text-green-700!"
                    >
                        <Undo className="text-green-700" />
                        Restore
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleDeleteAlert("PD", [row.original._id])}
                        className="text-red-700 hover:text-red-700!"
                    >
                        <Trash className="text-red-700" />
                        Delete Permanently
                    </DropdownMenuItem>
                </>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
}
