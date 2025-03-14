import mongoose, { Document } from "mongoose";

export interface WebsiteType {
  webName: string;
  webUrl: string;
  webIcon?: string;
}

export interface PageDocumentType extends Document {
  pageName: string;
  pageIcon: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  websites: WebsiteType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageType {
  pageName: string;
  pageIcon: string;
  websites: WebsiteType[];
}

export interface PagePreviewType {
  pageName: string;
  pageIcon: string;
  slug: string;
  createdAt: Date;
}

export interface EditPageType extends PageType {
  _id: string;
  createdAt: Date;
}
