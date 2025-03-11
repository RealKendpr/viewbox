"use server";

import { getUserData } from "@/_lib/getUserData";
import { getPathname } from "../create/_utils/getPathname";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel, { PageDocument } from "@/_lib/mongodb/models/PageModel";

export async function getPagesDetails(slug: string) {
  const userData = await getUserData(await getPathname());
  const userId = await userData.id;

  if (!userData) return null;

  try {
    await connectDB();
    const page: PageDocument | null = await PageModel.findOne({
      slug,
      userId,
    });

    const pageDTO = {
      pageName: page?.pageName,
      pageIcon: page?.pageIcon,
      createdAt: page?.createdAt,
      websites: page?.websites,
    };

    return pageDTO;
  } catch (error) {
    console.log(error);
    return null;
  }
}
