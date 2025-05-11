import { z } from "zod";

export const fileSizeLimit = 2 * 1024 * 1024; // 2MB
export const fileTypes = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/gif",
];

export const ImageSchemaValidation = z
  .instanceof(File)
  .refine((file) => fileTypes.includes(file.type))
  .refine((file) => file.size <= fileSizeLimit);
