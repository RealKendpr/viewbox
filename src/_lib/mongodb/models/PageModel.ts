import mongoose, { Document, Schema, model } from "mongoose";

export interface WebsiteType {
  webName: string;
  webUrl: string;
  webIcon?: string;
}

export interface PageDocument extends Document {
  pageName: string;
  pageIcon: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  websites: WebsiteType[];
  createdAt: Date;
  updatedAt: Date;
}

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

const PageSchema = new Schema<PageDocument>(
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
  mongoose.models?.Page || model<PageDocument>("Page", PageSchema);
export default PageModel;
