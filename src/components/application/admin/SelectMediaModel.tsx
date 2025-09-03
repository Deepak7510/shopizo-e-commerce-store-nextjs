"use client"
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { fetchMediaService } from '@/services/client/admin/media/fetchMediaService';
import { mediaType } from '@/types/admin.media.types'
import { useInfiniteQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react'
import { ButtonLoading } from '../common/ButtonLoading';
import MediaCardSkeleton from './MediaCardSkeleton';

type SelectMediaModelProps = {
    openSelectMediaModel: boolean;
    setOpenSelectMediaModel: React.Dispatch<SetStateAction<boolean>>;
    selectedMedia: mediaType[];
    setSelectedMedia: React.Dispatch<SetStateAction<mediaType[]>>;
}

const SelectMediaModel: React.FC<SelectMediaModelProps> = ({ openSelectMediaModel, setOpenSelectMediaModel, selectedMedia, setSelectedMedia }) => {

    const [selecteMediaList, setSelectMediaList] = useState<mediaType[]>([]);

    const { data, fetchNextPage, hasNextPage, isFetching, status } =
        useInfiniteQuery({
            queryKey: ["medias"],
            queryFn: async ({ pageParam = 1 }) =>
                await fetchMediaService(pageParam, "SD"),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data.hasMore ? allPages.length : undefined;
            },
        });

    const allMediaList = data?.pages
        ?.flatMap((group) => group.data.mediaList)
        .filter((item: any) => item.secure_url) as mediaType[];


    function handleSelecteMediaList(media: mediaType) {
        const selectedMediaIndex = selecteMediaList.findIndex(mediaItem => mediaItem._id === media._id);
        if (selectedMediaIndex === -1) {
            setSelectMediaList(pre => [...pre, media]);
        } else {
            const filterSelecteMediaList = selecteMediaList.filter(mediaItem => mediaItem._id !== media._id);
            setSelectMediaList(filterSelecteMediaList);
        }
    }

    function handleSelectMedia() {
        setSelectedMedia(selecteMediaList);
        setOpenSelectMediaModel(false);
    }

    useEffect(() => {
        setSelectMediaList(selectedMedia);
    }, [selectedMedia])

    function handleCloseMediaModel() {
        setSelectMediaList(selectedMedia);
        setOpenSelectMediaModel(false);
    }

    return (
        <Dialog open={openSelectMediaModel} onOpenChange={() => handleCloseMediaModel()}  >
            <DialogContent className="min-w-full md:min-w-[80%] max-h-screen gap-2">
                <AlertDialogHeader className='h-10 border-b'>
                    <DialogTitle>Select Media</DialogTitle>
                </AlertDialogHeader>
                <div className="border h-[calc(100vh-8rem)] overflow-auto p-1 rounded">
                    <>
                        {status === "pending" ? (
                            <div className="grid grid-cols-5 gap-2">
                                {Array(10)
                                    .fill(null)
                                    .map((_, index) => (
                                        <MediaCardSkeleton key={index} />
                                    ))}
                            </div>
                        ) : status === "error" ? (
                            <div>error</div>
                        ) : allMediaList && allMediaList?.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {allMediaList?.map((media) => {
                                    return <div onClick={() => handleSelecteMediaList(media)} key={media._id} className="border rounded overflow-hidden space-y-2">
                                        <div className="h-52 md:h-64 relative">
                                            <Image
                                                src={media.secure_url}
                                                alt={media.alt || "Media Image"}
                                                className="object-cover"
                                                unoptimized
                                                fill
                                            />
                                            <div className={`w-full h-full flex justify-center items-center top-0 absolute bg-gray-800 ${selecteMediaList.findIndex(mediItem => mediItem._id === media._id) >= 0 ? "opacity-50" : "opacity-0"}`}>
                                                <Check className="text-white w-10 h-10" />
                                            </div>
                                        </div>
                                        <h2 className="text-xs md:text-sm font-medium px-2 line-clamp-1">{media.title || "No Title"}</h2>
                                    </div>
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
                </div>

                <AlertDialogFooter className='h-10 border-t pt-1'>
                    <div className='flex gap-2'>
                        <Button onClick={handleCloseMediaModel} size={"sm"}>Close</Button>
                        <Button onClick={handleSelectMedia} size={"sm"}>Select</Button>
                    </div>
                </AlertDialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default SelectMediaModel



