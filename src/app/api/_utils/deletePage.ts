import "server-only";

import {
  ActiveLayoutModel,
  OptionsModel,
  StylesModel,
} from "@/_lib/mongodb/models/ConfigModels";
import { deleteThing } from "../_uploadthing/deleteThing";
import { PageDocumentType } from "@/types/PageTypes";

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
