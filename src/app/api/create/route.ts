import PageModel from "@/_lib/mongodb/models/PageModel";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getSlug } from "../_utils/getSlug";
import { findDuplicates } from "../_utils/findDuplicates";
import { uploadThing } from "@api/_uploadthing/uploadthing";
import { ServerCreateSchema } from "../_schema/schema";
import { getUserId } from "@/_lib/getUserData";
import { validUrls } from "@/app/_utils/fixUrl";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  const { links, ...rest } = formValues;

  const validData = ServerCreateSchema.safeParse({
    linkList: validUrls(JSON.parse(links as string)),
    ...rest,
  });

  if (validData.error) {
    return NextResponse.json({ error: validData.error }, { status: 422 });
  }

  const userId = await getUserId();
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const { pageIcon, pageName, pageDescription, linkList } = validData.data;

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

    const isDuplicate = await findDuplicates(pageName);
    if (isDuplicate) {
      return NextResponse.json(
        { error: "page with the same name already exist" },
        { status: 409 },
      );
    }

    const page = await new PageModel({
      pageIcon: uploadedIcon,
      pageName: pageName,
      pageDescription: pageDescription,
      slug: getSlug(pageName),
      userId: userId,
      links: linkList,
    });

    await page.save();

    return NextResponse.json(
      { message: "a new resource was created" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
