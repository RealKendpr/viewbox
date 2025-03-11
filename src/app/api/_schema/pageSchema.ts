import { z } from "zod";

export const websitesSchema = z.object({
  webName: z.string(),
  webUrl: z.string().url(),
  webIcon: z.string().optional(),
});

export const pageSchema = z.object({
  pageName: z.string(),
  pageIcon: z.string().optional(),
  websites: z.array(websitesSchema),
});
