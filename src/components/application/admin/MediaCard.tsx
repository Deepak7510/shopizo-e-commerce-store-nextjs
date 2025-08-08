"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, EllipsisVertical, Trash, Undo } from "lucide-react";
import { mediaType } from "@/types/admin.media.types";
import Link from "next/link";
import { adminRoutes } from "@/lib/client/routes";
import { TypesOfDeleteType } from "@/types/global.types";

export interface MediaCardProps {
    media: mediaType;
    handleDelete: (selectedMedia: string[], deleteType: TypesOfDeleteType) => void;
    handleCopy: (secure_url: string) => void;
    deleteType: TypesOfDeleteType;
    selectedMedia: string[];
    handleSelectedMedia: (mediaId: string) => void;
}


const MediaCard: React.FC<MediaCardProps> = ({
    media,
    handleDelete,
    handleCopy,
    deleteType,
    selectedMedia,
    handleSelectedMedia,
}) => {


    return (
        <Card className="rounded shadow-none hover:border-violet-700 py-2 relative">
            <CardContent className="px-2">
                <Checkbox
                    checked={
                        selectedMedia &&
                        selectedMedia.length > 0 &&
                        selectedMedia.indexOf(media._id) !== -1
                    }
                    onCheckedChange={() => handleSelectedMedia(media._id)}
                    className="absolute top-4 border-2 border-violet-700 left-4"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger
                        disabled={selectedMedia && selectedMedia.length > 0}
                        asChild
                        className="absolute rounded-full cursor-pointer top-4 right-4 flex justify-between"
                    >
                        <EllipsisVertical color="#6D28D9" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="center">

                        {deleteType === "SD" && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href={adminRoutes.medias.editMedia(media._id)}>
                                        <Edit />
                                        Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCopy(media.secure_url)}>
                                    <Copy />
                                    Copy Link
                                </DropdownMenuItem>
                            </>
                        )}

                        {deleteType === "PD" && (
                            <DropdownMenuItem className="text-green-700 hover:text-green-700!" onClick={() => handleDelete([media._id], "RSD")}>
                                <Undo className="text-green-700" />
                                Restore
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuItem className="text-red-700 hover:text-red-700!" onClick={() => handleDelete([media._id], deleteType)}>
                            <Trash className="text-red-700" />
                            {deleteType === "SD" ? "Move Into Trash" : "Delete Permanently"}
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
                <Image
                    src={media.secure_url}
                    alt={media.alt || "Media Image"}
                    className="object-cover w-full h-64"
                    width={300}
                    height={300}
                />
            </CardContent>
        </Card>
    );
};

export default MediaCard;
