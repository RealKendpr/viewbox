import { getUserData } from "@/_lib/getUserData";
import { getPathname } from "./create/_utils/getPathname";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel, { PageDocument } from "@/_lib/mongodb/models/Page";

export async function getPages() {
  // verify session and get user's id
  const userData = await getUserData(await getPathname());
  const userId = await userData.id;

  if (!userData) {
    return null;
  }

  try {
    // retrieve pages belonging to user id
    //
    await connectDB();
    const pages: PageDocument[] | null = await PageModel.find({ userId });

    const pagesDTO = pages.map((i) => {
      const items = {
        pageName: i.pageName,
        pageIcon: i.pageIcon,
        createdAt: i.createdAt,
      };

      return items;
    });

    // return them to user
    return pagesDTO;
  } catch (error) {
    return error;
  }
}
