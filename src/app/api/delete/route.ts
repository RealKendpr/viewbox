import { getUserData } from "@/_lib/getUserData";
import { PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";

const checks = async (request: NextRequest) => {
  const pathname = request.headers.get("X-Pathname");
  const pageId = await request.text();

  if (!pageId || pathname == null)
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

  const requestObj = {
    _id: pageId,
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
      _id: passedChecks._id,
      userId: passedChecks.userId,
    });

    findPage;

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
