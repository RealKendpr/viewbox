import mongoose, { Document } from "mongoose";

export interface LinkStyleType {
  linkColor: string;
  linkBackground: string;
  linkStyle: "default" | "soft" | "outline" | "ghost" | "";
}
export interface StylesType extends LinkStyleType {
  background: string;
  textColor: string;
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
  id?: string;
  linkName: string;
  linkUrl: string;
  linkIcon?: string;
}

interface pageIconOutputType {
  key: string;
  url: string;
}

export interface PageDocumentType extends Document {
  pageName: string;
  pageIcon: pageIconOutputType;
  pageDescription: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  links: LinkType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageType {
  pageName: string;
  pageDescription?: string;
  links: LinkType[];
}

export interface PageFormType extends PageType {
  pageIcon: File;
}

export interface PagePreviewType {
  pageIcon: pageIconOutputType;
  pageName: string;
  slug: string;
  createdAt: Date;
}

export interface EditPageType extends PageFormType {
  _id: string;
  createdAt: Date;
}

export interface PagePublicType extends PageType {
  pageIcon: pageIconOutputType;
}
