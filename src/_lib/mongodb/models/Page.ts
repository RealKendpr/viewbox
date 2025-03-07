import mongoose, { Document, Schema, model } from "mongoose";

export interface PageDocument extends Document {
  name: string;
  pageIcon: string;
  userId: mongoose.Types.ObjectId;
  websites: [
    {
      title: string;
      href: string;
      icon: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const websitesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ""
  }
});

const PageSchema = new Schema<PageDocument>(
  {
    name: {
      type: String,
      required: true
    },
    pageIcon: {
      type: String,
      default: ""
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    websites: [websitesSchema]
  },
  {
    timestamps: true
  }
);

const PageSchemaModel =
  mongoose.models?.Page || model<PageDocument>("PageDocument", PageSchema);
export default PageSchemaModel;
