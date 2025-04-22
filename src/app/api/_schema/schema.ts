import { z } from "zod";
import { linksSchema } from "./pageSchema";

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
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  linkList: z.array(linksSchema),
});

export const pageSchema = z.object({
  pageIcon: z.union([
    ImageSchemaValidation,
    z.object({ key: z.string(), url: z.string() }),
  ]),
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  links: z.array(linksSchema),
});
