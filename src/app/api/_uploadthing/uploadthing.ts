import "server-only";
import random from "random-string-generator";
import { UTApi } from "uploadthing/server";
import { FileEsque } from "uploadthing/types";
import { fileExt } from "../_utils/fileExtension";
import { pageIconOutputType } from "@/types/PageTypes";

export const utapi = new UTApi({
  // ...options,
});

export const uploadThing = async (pageIcon: File | pageIconOutputType | "") => {
  if (!(pageIcon instanceof File)) {
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
    console.error("UploadThing Error", uploadThing.error);
    return null;
  }

  const { ufsUrl, key } = uploadThing.data;

  return {
    key: key,
    url: ufsUrl,
  };
};
