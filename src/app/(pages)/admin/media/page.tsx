"use client";
import MediaCard from "@/components/application/admin/MediaCard";
import MediaCardSkeleton from "@/components/application/admin/MediaCardSkeleton";
import UploadMedia from "@/components/application/admin/UploadMedia";
import BreadCrumb, {
    breadcrumbListType,
} from "@/components/application/common/BreadCrumb";
import { ButtonLoading } from "@/components/application/common/ButtonLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { adminRoutes } from "@/lib/client/routes";
import { fetchMediaService } from "@/services/client/admin/media/fetchMediaService";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { DatabaseIcon, Recycle, Trash, Undo } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { IDataForDelete, useDeleteMutation } from "@/hooks/useDeleteMutation";
import { TypeOfDeleteType } from "@/types/global.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const breadcrumbList: breadcrumbListType[] = [
    {
        href: adminRoutes.dashboard,
        title: "Home",
    },
    {
        href: "",
        title: "Media",
    },
];

const MediaPage = () => {
    const queryClient = useQueryClient()
    const [deleteType, setDeleteType] = useState<TypeOfDeleteType>("SD");
    const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
    const [openDeleteAlertBox, setOpenDeleteAlertBox] = useState<boolean>(false);
    const [AlertDialogDescriptionMessage, setAlertDialogDescriptionMessage] = useState<string>("");
    const [selectedMediaForDelete, setSelectedMediaForDelete] = useState<IDataForDelete | null>(null)

    const { data, fetchNextPage, hasNextPage, isFetching, status } =
        useInfiniteQuery({
            queryKey: ["medias", deleteType],
            queryFn: async ({ pageParam = 1 }) =>
                await fetchMediaService(pageParam, deleteType),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.hasMore ? allPages.length : undefined;
            },
        });

    const allMediaList = data?.pages
        ?.flatMap((group) => group.data.mediaList)
        .filter((item) => item.secure_url);

    function handleDeleteType(deleteTypeValue: TypeOfDeleteType) {
        setDeleteType(deleteTypeValue);
        setSelectedMediaForDelete({
            selectedIdList: [],
            deleteType: deleteType
        })
        setSelectedMedia([])
    }


    function handleDelete(selectedMedia: string[], deleteType: TypeOfDeleteType) {
        setSelectedMediaForDelete({ selectedIdList: selectedMedia, deleteType })
        let alertMessage = "";
        switch (deleteType) {
            case "PD":
                alertMessage = "Are you sure you want to delete this permanently?";
                break;
            case "SD":
                alertMessage = "Are you sure you want to soft delete this media?";
                break;
            case "RSD":
                alertMessage = "Are you sure you want to restore this media?";
                break;
            default:
                alertMessage = "Unknown delete action.";
        }
        setAlertDialogDescriptionMessage(alertMessage);
        setOpenDeleteAlertBox(true);
    }

    const deleteMutation = useDeleteMutation("/api/admin/media/delete")

    function handleCanfirmDelete() {
        if (!selectedMediaForDelete) return;
        deleteMutation.mutate(selectedMediaForDelete, {
            onSuccess: (data) => {
                toast.success(data.message)
                setSelectedMedia([]);
                setSelectedMediaForDelete({
                    selectedIdList: [],
                    deleteType: deleteType
                })
                queryClient.invalidateQueries({ queryKey: ['medias'] })
            },
            onError: (error: any) => {
                toast.error(error?.message)
                console.error("Delete media error", error)
            },
        });
    }

    function handleSelectedMedia(mediaId: string) {
        if (selectedMedia.includes(mediaId)) {
            const cloneMediaSelectedData = [...selectedMedia];
            const filterSelectedMedia = cloneMediaSelectedData.filter(
                (item) => item !== mediaId
            );
            setSelectedMedia(filterSelectedMedia);
        } else {
            setSelectedMedia([...selectedMedia, mediaId]);
        }
    }

    function handleAllSelectedMedia() {
        if (allMediaList?.length === selectedMedia.length) {
            setSelectedMedia([]);
        } else {
            const allMediasId = allMediaList?.map((media) => media._id) || [];
            setSelectedMedia(allMediasId);
        }
    }

    function handleCopy(secure_url: string) {
        navigator.clipboard.writeText(secure_url);
        toast.success("Link copied");
    }

    return (
        <div className="space-y-1">
            <BreadCrumb breadcrumbList={breadcrumbList} />
            <Card className="rounded-md shadow-none py-2 gap-2">
                <CardHeader className="px-1.5 md:px-6">
                    <div className="flex justify-between">
                        <h1 className="text-xl text-violet-700 font-semibold">
                            {deleteType === "SD" ? "Media" : "Trash Media"}
                        </h1>
                        <div className="flex items-center gap-2">
                            {deleteType === "SD" ? (
                                <>
                                    <UploadMedia />

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size={"icon"}
                                                onClick={() => handleDeleteType("PD")}>
                                                <Recycle />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p className="font-medium">View Trash</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={() => handleDeleteType("SD")}
                                            size={"icon"}
                                        >
                                            <DatabaseIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="font-medium">Show Media</p>
                                    </TooltipContent>
                                </Tooltip>

                            )}
                        </div>
                    </div>
                    <Separator />
                </CardHeader>
                <CardContent className="px-1.5 md:px-6">
                    <AlertDialog
                        open={openDeleteAlertBox}
                        onOpenChange={setOpenDeleteAlertBox}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-700">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {AlertDialogDescriptionMessage}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCanfirmDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <>
                        {
                            selectedMedia && selectedMedia.length > 0 &&
                            <div className="flex justify-between w-full  mb-3">
                                <div className="flex items-center gap-3">
                                    <Label className="" htmlFor="selecteAll">
                                        Select All
                                    </Label>
                                    <Checkbox
                                        checked={
                                            selectedMedia &&
                                            selectedMedia.length > 0 &&
                                            selectedMedia.length === allMediaList?.length
                                        }
                                        name="selecteAll"
                                        onCheckedChange={handleAllSelectedMedia}
                                    />
                                </div>

                                {deleteType === "SD" ? (

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={() => handleDelete(selectedMedia, deleteType)}
                                                size={"icon"} variant={"secondary"}>
                                                <Trash />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p className="font-medium">Move to Trash</p>
                                        </TooltipContent>
                                    </Tooltip>

                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            className="bg-green-500 hover:bg-green-400"
                                            size={"sm"}
                                            onClick={() => handleDelete(selectedMedia, "RSD")}
                                        >
                                            <Undo />
                                            Restore
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(selectedMedia, "PD")}
                                            size={"sm"} variant={"destructive"}>
                                            <Trash />
                                            Delete Permanently
                                        </Button>
                                    </div>
                                )}
                            </div>
                        }
                    </>

                    <>
                        {status === "pending" ? (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                                {Array(10)
                                    .fill(null)
                                    .map((_, index) => (
                                        <MediaCardSkeleton key={index} />
                                    ))}
                            </div>
                        ) : status === "error" ? (
                            <div>error</div>
                        ) : allMediaList && allMediaList?.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                                {allMediaList?.map((mediaItem) => {
                                    return (
                                        <MediaCard
                                            key={mediaItem._id}
                                            media={mediaItem}
                                            deleteType={deleteType}
                                            selectedMedia={selectedMedia}
                                            handleDelete={handleDelete}
                                            handleSelectedMedia={handleSelectedMedia}
                                            handleCopy={handleCopy}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div>No Media</div>
                        )}
                    </>

                    <div className="flex justify-center my-4">
                        {hasNextPage ? (
                            <ButtonLoading
                                type="button"
                                text="Load More"
                                onclick={() => fetchNextPage()}
                                loading={isFetching}
                            />
                        ) : !isFetching && allMediaList?.length !== 0 ? (
                            <p className="font-medium">No more media</p>
                        ) : null}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MediaPage;
