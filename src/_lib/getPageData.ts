"use server";

import { connectDB } from "./mongodb/mongodb";
import { LinkType, PageDocumentType, PagePreviewType } from "@/types/PageTypes";
import PageModel from "./mongodb/models/PageModel";
import { getUserId } from "./getUserData";

export const pageExist = async (slug: string) => {
  await connectDB();
  const page = await PageModel.findOne({ slug: slug });

  if (!page) {
    return false;
  } else return true;
};

const pageData = (page: PageDocumentType) => {
  return {
    pageIcon: page?.pageIcon,
    pageName: page?.pageName,
    pageDescription: page?.pageDescription,
    links: page?.links,
  };
};

const formData = (page: PageDocumentType) => {
  return {
    pageId: (page?._id as any).toString(),
    pageIcon: page?.pageIcon,
    pageName: page?.pageName,
    pageDescription: page?.pageDescription,
    createdAt: page?.createdAt,
    links: page.links.map((i: LinkType) => {
      return { linkName: i.linkName, linkUrl: i.linkUrl };
    }),
  };
};

const previewData = (pages: PageDocumentType[]) => {
  return pages.map((i: PagePreviewType) => {
    return {
      pageName: i.pageName,
      pageIcon: i.pageIcon,
      slug: i.slug,
      createdAt: i.createdAt,
    };
  });
};

const handleError = (error: any) => {
  console.error("Unexpected error occured", error);
  return null;
};

export async function getPage(slug: string) {
  try {
    await connectDB();
    const page: PageDocumentType | null = await PageModel.findOne({
      slug: slug,
    });

    if (!page) return null;
    else return pageData(page);
  } catch (error) {
    return handleError(error);
  }
}

export async function getPageForm(slug: string) {
  const userId = await getUserId();

  try {
    await connectDB();
    const page: PageDocumentType | null = await PageModel.findOne({
      slug: slug,
      userId: userId,
    });

    if (!page) return null;
    else return formData(page);
  } catch (error) {
    return handleError(error);
  }
}

export async function getPagesPreview() {
  const userId = await getUserId();

  try {
    await connectDB();
    const pages: PageDocumentType[] | null = await PageModel.find({
      userId: userId,
    });

    return previewData(pages);
  } catch (error) {
    return handleError(error);
  }
}
