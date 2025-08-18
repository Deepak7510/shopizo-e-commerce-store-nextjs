"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit } from "lucide-react"
import Link from "next/link"

const EditAction = ({ row, editEndPoint }: { row: any, editEndPoint: (id: string) => string }) => {
    return <DropdownMenuItem asChild>
        <Link href={editEndPoint(row.original._id)}>
            <Edit className="w-4 h-4" />
            Edit
        </Link>
    </DropdownMenuItem>
}

export default EditAction
