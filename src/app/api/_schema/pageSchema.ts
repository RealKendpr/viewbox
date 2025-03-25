import { z } from "zod";

export const optionsSchema = z.object({
  pageName: z.string(),
  newTab: z.boolean().optional(),
});

export const linksSchema = z.object({
  linkName: z.string(),
  linkUrl: z
    .string()
    .regex(
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    ),
});

export const pageSchema = z.object({
  pageIcon: z.string().optional(),
  pageName: z.string(),
  pageDescription: z.string().max(100).optional(),
  links: z.array(linksSchema),
});
