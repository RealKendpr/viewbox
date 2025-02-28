import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Usernmae is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Usernmae is invalid",
      ],
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
