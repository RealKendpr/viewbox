import { z } from "zod";

export const websitesSchema = z.object({
  webName: z.string(),
  webUrl: z.string().url(),
  webIcon: z.string().optional(),
});

export const pageSchema = z.object({
  pageIcon: z.string().optional(),
  pageName: z.string(),
  pageDescription: z.string().optional(),
  websites: z.array(websitesSchema),
});
