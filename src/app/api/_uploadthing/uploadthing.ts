import "server-only";
import { NextResponse } from "next/server";
import random from "random-string-generator";
import { UTApi } from "uploadthing/server";
import { FileEsque } from "uploadthing/types";
import { fileExt } from "../_utils/fileExtension";

export const utapi = new UTApi({
  // ...options,
});

export const uploadThing = async (pageIcon: File | "") => {
  if (pageIcon === "") {
    return {
      key: "",
      url: "",
    };
  }

  const renamedIcon = new File(
    [pageIcon],
    `${random(18)}${fileExt(pageIcon.type)}`,
    { type: pageIcon.type },
  ) as FileEsque;

  const uploadThing = await utapi.uploadFiles(renamedIcon);
  if (uploadThing.error) {
    return NextResponse.json({ error: uploadThing.error }, { status: 400 });
  }

  const { ufsUrl, key } = uploadThing.data;

  return {
    key: key,
    url: ufsUrl,
  };
};
