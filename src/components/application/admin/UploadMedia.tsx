"use client"
import React from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetError, } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createmediaService } from '@/services/client/media/createMediaService';
import { useQueryClient } from '@tanstack/react-query';
import { TypesOfMediaInput, TypedOfUploadMediaArray } from '@/types/admin.media.types';
import { uploadMediaArrayZodSchema } from '@/zodSchema/admin.media.schema';

const UploadMedia = () => {

    const queryClient = useQueryClient()

    function handleError(error: CloudinaryUploadWidgetError) {
        console.log(error)
    }

    async function handleOnQueuesEnd(result: any) {
        const files = result?.info?.files
        const uploadedFiles: TypedOfUploadMediaArray = files.filter((file: any) => file.uploadInfo).map((file: any) => ({
            asset_id: file.uploadInfo.asset_id,
            public_id: file.uploadInfo.public_id,
            secure_url: file.uploadInfo.secure_url,
            path: file.uploadInfo.path,
            thumbnail_url: file.uploadInfo.thumbnail_url
        }))

        if (uploadedFiles.length > 0) {
            const checkValidation = uploadMediaArrayZodSchema.safeParse(uploadedFiles);
            if (!checkValidation.success) {
                console.error(checkValidation.error);
                toast.error("Invalid file data")
                return
            }

            const result = await createmediaService(checkValidation.data);
            if (result.success) {
                toast.success(result.message)
                queryClient.invalidateQueries({ queryKey: ['medias'] })
            } else {
                toast.error(result.message)
            }
        }

    }
    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME}
            signatureEndpoint="/api/admin/media/cloudinary-signature"
            onError={handleError}
            onQueuesEnd={handleOnQueuesEnd}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                    apiSecret: process.env.CLOUDINARY_API_SECRET
                }
            }}
            options={{
                sources: ['local', 'url', 'unsplash', "google_drive"],
                multiple: true,
            }}
        >
            {({ open }) => {
                return (
                    <Button size={'sm'} onClick={() => open()}>
                        <Plus />
                        Upload Images
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadMedia
