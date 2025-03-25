import { OptionsExtendedType } from "@/types/PageTypes";
import mongoose, { Schema, model } from "mongoose";

const OptionsSchema = new Schema<OptionsExtendedType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  newTab: {
    type: Boolean,
    required: false,
  },
});

const OptionsModel =
  mongoose.models.Options ||
  model<OptionsExtendedType>("Options", OptionsSchema);
export default OptionsModel;
