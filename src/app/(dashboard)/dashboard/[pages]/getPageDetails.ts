"use server";

import { getUserData } from "@/_lib/getUserData";
import { getPathname } from "../create/_utils/getPathname";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { PageDocumentType } from "@/types/PageTypes";

export async function getPagesDetails(slug: string) {
  const userData = await getUserData(await getPathname());
  const userId = userData?._id;

  if (!userData) return null;

  try {
    await connectDB();
    const page: PageDocumentType | null = await PageModel.findOne({
      slug,
      userId,
    });

    if (!page) return null;

    const pageDTO = {
      _id: page?._id as string,
      pageIcon: page?.pageIcon,
      pageName: page?.pageName,
      pageDescription: page?.pageDescription,
      createdAt: page?.createdAt,
      websites: page?.websites,
    };

    return pageDTO;
  } catch (error) {
    console.log(error);
    return null;
  }
}
