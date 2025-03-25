import { LinkType, PageDocumentType } from "@/types/PageTypes";
import mongoose, { Schema, model } from "mongoose";

const linksSchema = new Schema<LinkType>({
  linkName: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkIcon: {
    type: String,
    default: "",
  },
});

const PageSchema = new Schema<PageDocumentType>(
  {
    pageIcon: {
      type: String,
      default: "",
    },
    pageName: {
      type: String,
      required: true,
    },
    pageDescription: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    links: [linksSchema],
  },
  {
    timestamps: true,
  },
);

const PageModel =
  mongoose.models?.Page || model<PageDocumentType>("Page", PageSchema);
export default PageModel;
