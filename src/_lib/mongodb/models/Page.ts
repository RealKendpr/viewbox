import mongoose, { Document, Schema, model } from "mongoose";

export interface PageDocument extends Document {
  pageName: string;
  pageIcon: string;
  userId: mongoose.Types.ObjectId;
  websites: [
    {
      webName: string;
      webUrl: string;
      webIcon?: string;
    },
  ];
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

const PageSchemaModel =
  mongoose.models?.Page || model<PageDocument>("PageDocument", PageSchema);
export default PageSchemaModel;
