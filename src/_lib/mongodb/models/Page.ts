import mongoose, { Document, Schema, model } from "mongoose";

interface PageDocument extends Document {
  name: string;
  pageIcon: string;
  userId: mongoose.Types.ObjectId;
  links: [
    {
      title: string;
      href: string;
      icon: string;
    }
  ];
}

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
});

const PageSchema = new Schema<PageDocument>({
  name: {
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
  links: [linkSchema],
});

const PageSchemaModel =
  mongoose.models?.Page || model<PageDocument>("PageDocument", PageSchema);
export default PageSchemaModel;
