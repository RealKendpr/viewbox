import { z } from "zod";
import layouts from "@/layouts/layouts.json";
import { ImageSchemaValidation } from "./imageSchema";

const layoutsEnum = layouts.layouts as [string, ...string[]];

export const StylesSchema = z.object({
  validSlug: z.string().trim().min(1, { message: "required" }),
  styles: z.object(
    {
      validBackground: z.union([ImageSchemaValidation, z.string()]),
      textColor: z.string().nullable(),
      cardColor: z.string().nullable(),
      linkColor: z.string().nullable(),
      linkBackground: z.string().nullable(),
      linkStyle: z.string().nullable(),
    },
    { message: "required" },
  ),
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
  linkUrl: z.string().url(),
});
