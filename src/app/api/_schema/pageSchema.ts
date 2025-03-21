import { z } from "zod";

export const websitesSchema = z.object({
  webName: z.string(),
  webUrl: z
    .string()
    .regex(
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    ),
});

export const pageSchema = z.object({
  pageIcon: z.string().optional(),
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  websites: z.array(websitesSchema),
});
