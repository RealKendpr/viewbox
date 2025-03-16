import { getUserData } from "@/_lib/getUserData";
import { EditPageType, PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { pageSchema } from "../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { getSlug } from "../_utils/getSlug";
import { findDuplicates } from "../_utils/findDuplicates";

export async function PUT(request: NextRequest) {
  const pathname = request.headers.get("X-Pathname");
  const data: EditPageType = await request.json();

  if (!data || pathname == null)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
    );

  const userId = await getUserData("userId");

  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const result = pageSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(result.error);
  }

  const pageId = data._id;
  const { pageName, ...rest } = result.data;

  const newData = {
    ...rest,
    pageName: pageName,
    slug: getSlug(pageName),
  };

  try {
    await connectDB();

    // must check if the page that is being updated belongs to the user making the request
    const findPage: PageDocumentType | null = await PageModel.findOne({
      _id: pageId,
      userId: userId,
    });
    if (!findPage)
      return NextResponse.json(
        { message: "client does not have access rights to the content" },
        { status: 403 },
      );
    // check if the slug of the current page is different than what was submitted,
    // if it is the check if that new slug already exist
    if (findPage.slug !== getSlug(pageName)) {
      const isDuplicate = await findDuplicates(pageName);
      if (isDuplicate)
        return NextResponse.json(
          { error: "page with the same name already exist" },
          { status: 409 },
        );
    }

    const updatePage = await PageModel.findOneAndUpdate(
      { _id: pageId },
      newData,
    );

    await updatePage.save();

    return NextResponse.json(
      { message: "selected resource updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
