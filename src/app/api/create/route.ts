import { getUserData } from "@/_lib/getUserData";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { PageType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { pageSchema } from "../_schema/pageSchema";
import { getSlug } from "../_utils/getSlug";
import { findDuplicates } from "../_utils/findDuplicates";
import { utapi } from "@api/_uploadthing/uploadthing";
import { FileEsque } from "uploadthing/types";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  if (!formData)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
    );

  const userId = (await getUserData("userId")) as string;
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const uploadThing = await utapi.uploadFiles(
    formData.get("pageIcon") as FileEsque,
  );
  if (uploadThing.error) {
    return NextResponse.json({ error: uploadThing.error }, { status: 400 });
  }

  const { key, ufsUrl } = uploadThing.data;

  const formValues = Object.fromEntries(formData) as any as PageType;
  const data: PageType = {
    pageIcon: ufsUrl,
    pageName: formValues.pageName,
    pageDescription: formValues.pageDescription,
    links: JSON.parse(formValues.links as any),
  };

  if (data.links.length === 0)
    return NextResponse.json(
      { error: "at least one link is requried" },
      { status: 411 },
    );

  const result = pageSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const { pageIcon, pageName, pageDescription, links } = result.data;

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
      pageIcon: pageIcon,
      pageName: pageName,
      pageDescription: pageDescription,
      slug: getSlug(pageName),
      userId: userId,
      links: links,
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
