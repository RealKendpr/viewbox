import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
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
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default UserModel;
