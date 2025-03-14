"use server";

import PageModel from "@/_lib/mongodb/models/PageModel";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { PageDocumentType } from "@/types/PageTypes";

export async function getPage(slug: string) {
  try {
    await connectDB();
    const page: PageDocumentType | null = await PageModel.findOne({
      slug: slug,
    });

    if (!page) return null;

    const pageDTO = {
      pageName: page?.pageName,
      pageIcon: page?.pageIcon,
      websites: page?.websites,
    };

    return pageDTO;
  } catch (error) {
    console.log(error);
    return null;
  }
}
