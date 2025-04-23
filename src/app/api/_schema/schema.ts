import { z } from "zod";
import { linksSchema } from "./pageSchema";
import { pageNameRegex } from "../_utils/regEx";

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

export const ServerCreateSchema = z.object({
  pageIcon: z.union([ImageSchemaValidation, z.literal("")]),
  pageName: z.string().regex(pageNameRegex),
  pageDescription: z.string().max(100).optional(),
  linkList: z.array(linksSchema),
});

export const EditSchema = z.object({
  pageId: z.string(),
  pageIcon: z.union([ImageSchemaValidation, z.string()]),
  pageName: z.string().regex(pageNameRegex),
  pageDescription: z.string().max(100).optional(),
  linkList: z.array(linksSchema),
});
