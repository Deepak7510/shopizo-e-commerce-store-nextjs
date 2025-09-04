import {
  editMediaZodSchema,
  uploadMediaArrayZodSchema,
  uploadMediaZodSchema,
} from "@/zodSchema/admin.media.schema";
import { z } from "zod";

export type TypeOfMediaInput = z.infer<typeof uploadMediaZodSchema>;

export type TypedOfUploadMediaArray = z.infer<typeof uploadMediaArrayZodSchema>;

export type mediaType = {
  _id: string;
  asset_id: string;
  public_id: string;
  secure_url: string;
  path: string;
  thumbnail_url: string;
  alt?: string;
  title?: string;
  deletedAt?: Date | null;
};

export type TypeOfEditMedia = z.infer<typeof editMediaZodSchema>;
