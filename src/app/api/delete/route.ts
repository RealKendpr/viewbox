import { getUserData } from "@/_lib/getUserData";
import { PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { deleteThing } from "../_uploadthing/deleteThing";

const checks = async (request: NextRequest) => {
  const pageSlug = await request.text();

  if (!pageSlug)
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

  const requestObj = {
    pageSlug: pageSlug,
    userId: userId,
  };

  return requestObj;
};

export async function DELETE(request: NextRequest) {
  // the checking is in a different function, I think this will be good for testing
  const passedChecks = await checks(request);

  if (!("userId" in passedChecks)) {
    return passedChecks;
  }

  try {
    await connectDB();

    const findPage: PageDocumentType | null = await PageModel.findOneAndDelete({
      slug: passedChecks.pageSlug,
      userId: passedChecks.userId,
    });

    if (!findPage) {
      return NextResponse.json(
        { error: "client does not have access rights to the content" },
        { status: 403 },
      );
    }

    await deleteThing(findPage?.pageIcon.key);
    await findPage;

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
