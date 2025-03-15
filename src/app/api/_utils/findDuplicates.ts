import PageModel from "@/_lib/mongodb/models/PageModel";
import { PageDocumentType } from "@/types/PageTypes";
import { getSlug } from "./getSlug";

export async function findDuplicates(newPageName: string) {
  // must check if theres a duplicate page slug to avoid slug/url problem later
  // this check is global; will check same page slug from other users as well.
  // check using slug instead of name, because slugs are lowercase name
  const findDuplicates: PageDocumentType | null = await PageModel.findOne({
    slug: getSlug(newPageName),
  });

  if (findDuplicates) {
    return true;
  }
  return false;
}
