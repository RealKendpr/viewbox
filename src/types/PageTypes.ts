import mongoose, { Document } from "mongoose";

export interface StylesType {
  background: string;
  cardColor: string;
}

export interface StylesExtendedType extends Document {
  userId: mongoose.Types.ObjectId | string;
  slug: string;
  styles: StylesType;
}

export interface LayoutsType {
  activeLayout: string;
}

export interface LayoutsExtendedType extends Document {
  userId: mongoose.Types.ObjectId | string;
  slug: string;
  activeLayout: string;
}

export interface OptionsType {
  newTab?: boolean;
}
export interface OptionsExtendedType extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  newTab?: boolean;
}

export interface ConfigType {
  options?: OptionsType;
}

export interface LinkType {
  linkName: string;
  linkUrl: string;
  linkIcon?: string;
}

export interface PageDocumentType extends Document {
  pageName: string;
  pageIcon: string;
  pageDescription: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  links: LinkType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageType {
  pageIcon: string;
  pageName: string;
  pageDescription: string;
  links: LinkType[];
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
