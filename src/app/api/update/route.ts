import { getUserData } from "@/_lib/getUserData";
import { EditPageType, PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { pageSchema } from "../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";

export async function PUT(request: NextRequest) {
  const pathname = request.headers.get("X-Pathname");
  const data: EditPageType = await request.json();

  if (!data || pathname == null)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
    );

  const userData = await getUserData(pathname);
  const userId = userData?._id;

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
  const { pageName, pageIcon, websites } = result.data;

  try {
    await connectDB();

    // must check first if there is any page document that has the user's id,
    // and that have the requested page id

    const findPage: PageDocumentType | null = await PageModel.findOne({
      _id: pageId,
      userId: userId,
    });

    if (!findPage)
      return NextResponse.json(
        {
          message: `client does not have access rights to the content ${pageId} , ${userId}`,
        },
        { status: 403 },
      );

    const updatedPage = await PageModel.findOneAndUpdate(
      { _id: pageId },
      result.data,
    );

    await updatedPage.save();

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
