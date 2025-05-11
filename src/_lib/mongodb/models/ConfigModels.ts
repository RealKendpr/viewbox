import {
  LayoutsExtendedType,
  OptionsExtendedType,
  StylesExtendedType,
  StylesType,
} from "@/types/PageTypes";
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
const OptionsModel =
  mongoose.models.Options ||
  model<OptionsExtendedType>("Options", OptionsSchema);

//

const ActiveLayoutSchema = new Schema<LayoutsExtendedType>({
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
const ActiveLayoutModel =
  mongoose.models.Layouts ||
  model<LayoutsExtendedType>("Layouts", ActiveLayoutSchema);

//

const Styles = new Schema<StylesType>(
  {
    background: {
      type: String,
    },
    imageBackground: {
      type: Object,
      default: {
        key: "",
        url: "",
      },
      required: false,
    },
    cardColor: {
      type: String,
    },
    linkBackground: {
      type: String,
    },
  },
  { strict: false },
);

const StylesSchema = new Schema<StylesExtendedType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  styles: Styles,
});
const StylesModel =
  mongoose.models.Styles || model<StylesExtendedType>("Styles", StylesSchema);

export { OptionsModel, ActiveLayoutModel, StylesModel };
