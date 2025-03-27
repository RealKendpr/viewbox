import { LayoutsType, OptionsExtendedType } from "@/types/PageTypes";
import { connectDB } from "./mongodb/mongodb";
import { ActiveLayoutModel, OptionsModel } from "./mongodb/models/ConfigModels";

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
    const findLayout: LayoutsType | null = await ActiveLayoutModel.findOne({
      slug: slug,
    });

    if (!findLayout) {
      return null;
    }
    return findLayout.activeLayout;
  } catch (error) {
    console.log(error);
    return null;
  }
}
