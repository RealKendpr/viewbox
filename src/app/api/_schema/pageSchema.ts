import { z } from "zod";

export const websitesSchema = z.object({
  webName: z.string(),
  webUrl: z.string().url(),
});

export const pageSchema = z.object({
  pageIcon: z.string().optional(),
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  websites: z.array(websitesSchema),
});
