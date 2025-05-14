import "server-only";

import {
  ActiveLayoutModel,
  OptionsModel,
  StylesModel,
} from "@/_lib/mongodb/models/ConfigModels";
import { deleteThing } from "../_uploadthing/deleteThing";
import PageModel from "@/_lib/mongodb/models/PageModel";

export async function deleteManyPages(userId: string) {
  const filter = {
    userId: userId,
  };
  const pages = await PageModel.find(filter);
  const styles = await StylesModel.find(filter);

  await PageModel.deleteMany(filter);
  await ActiveLayoutModel.deleteMany(filter);
  await StylesModel.deleteMany(filter);
  await OptionsModel.deleteMany(filter);

  pages.map(async (item) => {
    await deleteThing(item.pageIcon.key);
  });
  styles.map(async (item) => {
    await deleteThing(item.background);
  });

  return;
}
