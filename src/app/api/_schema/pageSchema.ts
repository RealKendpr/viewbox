import { z } from "zod";
import layouts from "@/layouts/layouts.json";

const layoutsEnum = layouts.layouts as [string, ...string[]];

export const StylesSchema = z.object({
  slug: z.string(),
  styles: z.object({
    background: z.string(),
    cardColor: z.string(),
    linkColor: z.string(),
  }),
});

export const optionsSchema = z.object({
  slug: z.string(),
  newTab: z.boolean().optional(),
});

export const layoutSchema = z.object({
  slug: z.string(),
  active: z.enum(layoutsEnum),
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
