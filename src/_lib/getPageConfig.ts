import { OptionsExtendedType, OptionsType } from "@/types/PageTypes";
import { connectDB } from "./mongodb/mongodb";
import OptionsModel from "./mongodb/models/ConfigModels";

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
