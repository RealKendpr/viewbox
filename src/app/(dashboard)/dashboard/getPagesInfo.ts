"use server";

import { getUserData } from "@/_lib/getUserData";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { PageDocumentType } from "@/types/PageTypes";

export async function getPagesInfo() {
  const userId = await getUserData("userId");

  if (!userId) {
    return null;
  }

  try {
    await connectDB();
    const pages: PageDocumentType[] | null = await PageModel.find({ userId });

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
