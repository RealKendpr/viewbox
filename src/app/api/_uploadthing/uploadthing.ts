import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { FileEsque } from "uploadthing/types";

export const utapi = new UTApi({
  // ...options,
});

export const uploadThing = async (pageIcon: FileEsque | "") => {
  if (pageIcon === "") {
    return "";
  }

  const uploadThing = await utapi.uploadFiles(pageIcon);
  if (uploadThing.error) {
    return NextResponse.json({ error: uploadThing.error }, { status: 400 });
  }

  const { ufsUrl } = uploadThing.data;

  return ufsUrl;
};
