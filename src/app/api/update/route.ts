import { getUserData } from "@/_lib/getUserData";
import { PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { EditSchema } from "../_schema/schema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { getSlug } from "../_utils/getSlug";
import { findDuplicates } from "../_utils/findDuplicates";
import { uploadThing } from "../_uploadthing/uploadthing";
import { deleteThing } from "../_uploadthing/deleteThing";

export async function PATCH(request: NextRequest) {
  const formData = await request.formData();
  const { links, ...restData } = Object.fromEntries(formData);
  const validData = EditSchema.safeParse({
    linkList: JSON.parse(links as any),
    ...restData,
  });

  if (validData.error) {
    return NextResponse.json({ error: validData.error }, { status: 422 });
  }

  const userId = await getUserData("userId");
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const { pageId, pageIcon, pageName, linkList, ...rest } = validData.data;

  if (linkList.length === 0)
    return NextResponse.json(
      { error: "at least one link is requried" },
      { status: 411 },
    );

  const uploadedIcon = await uploadThing(pageIcon);

  if (uploadedIcon === null) {
    return NextResponse.json(
      { error: "Error saving in saving the page icon." },
      { status: 400 },
    );
  }

  try {
    await connectDB();

    // must check if the page that is being updated belongs to the user making the request
    const findPage: PageDocumentType | null = await PageModel.findOne({
      _id: pageId,
      userId: userId,
    });
    if (!findPage)
      return NextResponse.json(
        { error: "client does not have access rights to the content" },
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
    if (findPage.pageIcon.key !== uploadedIcon.key) {
      await deleteThing(findPage.pageIcon.key);
    }

    const newData = {
      pageIcon: uploadedIcon,
      pageName: pageName,
      slug: getSlug(pageName),
      links: linkList,
      ...rest,
    };

    const updatePage = await PageModel.findOneAndUpdate(
      { _id: pageId, userId: userId },
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
