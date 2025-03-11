"use server";

import { getUserData } from "@/_lib/getUserData";
import { getPathname } from "./create/_utils/getPathname";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel, { PageDocument } from "@/_lib/mongodb/models/Page";

export async function getPagesInfo() {
  const userData = await getUserData(await getPathname());
  const userId = await userData.id;

  if (!userData) {
    return null;
  }

  try {
    await connectDB();
    const pages: PageDocument[] | null = await PageModel.find({ userId });

    // return only the necessary data
    const pagesDTO = pages.map((i) => {
      const items = {
        pageName: i.pageName,
        pageIcon: i.pageIcon,
        slug: i.slug,
        createdAt: i.createdAt,
      };

      return items;
    });

    return pagesDTO;
  } catch (error) {
    console.log(error);
    return null;
  }
}
