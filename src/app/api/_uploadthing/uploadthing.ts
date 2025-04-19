import "server-only";
import { NextResponse } from "next/server";
import random from "random-string-generator";
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

  const { ufsUrl, key } = uploadThing.data;

  const fileExt = (type: string) => {
    if (type == "image/png") {
      return ".png";
    }
    if (type == "image/jpeg") {
      return ".jpeg";
    }
    if (type == "image/gif") {
      return ".gif";
    }
    if (type == "image/svg+xml") {
      return ".svg";
    }
    return "";
  };

  await utapi.renameFiles({
    fileKey: key,
    newName: `${random(18)}${fileExt(pageIcon.type)}`,
  });

  return ufsUrl;
};
