import { UserDocumentType } from "@/types/UserTypes";
import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema<UserDocumentType>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      match: [/[A-Za-z][A-Za-z0-9\-]*/, "Username is invalid"],
    },
    password: {
      type: String,
      required: true,
    },
    userTheme: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel =
  mongoose.models?.User || model<UserDocumentType>("User", UserSchema);
export default UserModel;
