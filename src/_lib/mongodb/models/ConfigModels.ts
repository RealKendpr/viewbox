import { LayoutsType, OptionsExtendedType } from "@/types/PageTypes";
import mongoose, { Schema, model } from "mongoose";
import layouts from "@/layouts/layouts.json";

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

export const OptionsModel =
  mongoose.models.Options ||
  model<OptionsExtendedType>("Options", OptionsSchema);

const ActiveLayoutSchema = new Schema<LayoutsType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  activeLayout: {
    type: String,
    enum: layouts.layouts,
  },
});

export const ActiveLayoutModel =
  mongoose.models.Layouts || model<LayoutsType>("Layouts", ActiveLayoutSchema);
