import { PageDocumentType } from "@/types/PageTypes";
import mongoose, { Schema, model } from "mongoose";

const websitesSchema = new mongoose.Schema({
  webName: {
    type: String,
    required: true,
  },
  webUrl: {
    type: String,
    required: true,
  },
  webIcon: {
    type: String,
    default: "",
  },
});

const PageSchema = new Schema<PageDocumentType>(
  {
    pageName: {
      type: String,
      required: true,
    },
    pageIcon: {
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
    websites: [websitesSchema],
  },
  {
    timestamps: true,
  },
);

const PageModel =
  mongoose.models?.Page || model<PageDocumentType>("Page", PageSchema);
export default PageModel;
