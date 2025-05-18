import { getUserId } from "@/_lib/getUserData";
import { PageDocumentType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/_lib/mongodb/mongodb";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { deleteThing } from "../_uploadthing/deleteThing";
import {
  ActiveLayoutModel,
  OptionsModel,
  StylesModel,
} from "@/_lib/mongodb/models/ConfigModels";
import { getUploadthingKey } from "@/app/_utils/getUploadthingKey";

const checks = async (request: NextRequest) => {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const pageSlug = await request.text();
  if (!pageSlug)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
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

    const documentId = {
      slug: passedChecks.pageSlug,
      userId: passedChecks.userId,
    };

    const pageToDelete: PageDocumentType | null =
      await PageModel.findOneAndDelete(documentId);

    if (!pageToDelete) {
      return NextResponse.json(
        { error: "client does not have access rights to the content" },
        { status: 403 },
      );
    }

    await pageToDelete;
    await deleteThing(pageToDelete.pageIcon.key);
    await ActiveLayoutModel.findOneAndDelete(documentId);
    await OptionsModel.findOneAndDelete(documentId);

    const styleToDelete = await StylesModel.findOneAndDelete(documentId);

    if (styleToDelete) {
      const backgroundKey = getUploadthingKey(styleToDelete.styles.background);
      await deleteThing(backgroundKey);
    }

    await styleToDelete;

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
