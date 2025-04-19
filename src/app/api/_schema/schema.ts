import { z } from "zod";
import { linksSchema } from "./pageSchema";
const fileSizeLimit = 2 * 1024 * 1024; // 2MB

export const ImageSchemaValidation = z
  .instanceof(File)
  .refine((file) =>
    [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/gif",
    ].includes(file.type),
  )
  .refine((file) => file.size <= fileSizeLimit);

export const ServerCreateSchema = z.object({
  pageIcon: z.union([ImageSchemaValidation, z.literal("")]),
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  linkList: z.array(linksSchema),
});
