import { OptionsType } from "@/types/PageTypes";
import mongoose, { Schema, model } from "mongoose";

const OptionsSchema = new Schema<OptionsType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  newTab: {
    type: Boolean,
    required: false,
  },
});

const OptionsModel =
  mongoose.models.Options || model<OptionsType>("Options", OptionsSchema);
export default OptionsModel;
