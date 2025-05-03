import "server-only";

import {
  ActiveLayoutModel,
  OptionsModel,
  StylesModel,
} from "@/_lib/mongodb/models/ConfigModels";
import { deleteThing } from "../_uploadthing/deleteThing";
import { PageDocumentType } from "@/types/PageTypes";
import PageModel from "@/_lib/mongodb/models/PageModel";

export async function deletePage(
  documentId: object,
  pageToDelete: PageDocumentType,
) {
  await pageToDelete;
  await deleteThing(pageToDelete.pageIcon.key);
  await ActiveLayoutModel.findOneAndDelete(documentId);
  await StylesModel.findOneAndDelete(documentId);
  await OptionsModel.findOneAndDelete(documentId);
}

export async function deleteManyPages(userId: string) {
  const filter = {
    userId: userId,
  };
  const pages = await PageModel.find(filter);

  await PageModel.deleteMany(filter);
  await ActiveLayoutModel.deleteMany(filter);
  await StylesModel.deleteMany(filter);
  await OptionsModel.deleteMany(filter);

  pages.map(async (item) => {
    await deleteThing(item.pageIcon.key);
  });

  return;
}
