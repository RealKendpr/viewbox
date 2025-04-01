import {
  LayoutsExtendedType,
  OptionsExtendedType,
  StylesExtendedType,
  StylesType,
} from "@/types/PageTypes";
import { connectDB } from "./mongodb/mongodb";
import {
  ActiveLayoutModel,
  OptionsModel,
  StylesModel,
} from "./mongodb/models/ConfigModels";

export async function getOptions(slug: string) {
  try {
    await connectDB();
    const options: OptionsExtendedType | null = await OptionsModel.findOne({
      slug: slug,
    });

    if (!options) return null;

    return {
      newTab: options.newTab,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getActiveLayout(slug: string) {
  try {
    await connectDB();
    const findLayout: LayoutsExtendedType | null =
      await ActiveLayoutModel.findOne({
        slug: slug,
      });

    if (!findLayout) {
      return "default";
    }
    return findLayout.activeLayout;
  } catch (error) {
    console.log(error);
    return "default";
  }
}

export async function getStyles(slug: string): Promise<StylesType | null> {
  try {
    await connectDB();
    const findStyles: StylesExtendedType | null = await StylesModel.findOne({
      slug: slug,
    });

    if (!findStyles) {
      return null;
    }

    return findStyles.styles;
  } catch (error) {
    console.log(error);
    return null;
  }
}
