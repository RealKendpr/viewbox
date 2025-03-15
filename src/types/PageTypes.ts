import mongoose, { Document } from "mongoose";

export interface WebsiteType {
  webName: string;
  webUrl: string;
  webIcon?: string;
}

export interface PageDocumentType extends Document {
  pageName: string;
  pageIcon: string;
  pageDescription: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  websites: WebsiteType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageType {
  pageIcon: string;
  pageName: string;
  pageDescription: string;
  websites: WebsiteType[];
}

export interface PagePreviewType {
  pageIcon: string;
  pageName: string;
  slug: string;
  createdAt: Date;
}

export interface EditPageType extends PageType {
  _id: string;
  createdAt: Date;
}
