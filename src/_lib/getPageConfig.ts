"use server";

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
import PageModel from "./mongodb/models/PageModel";
import { redirect } from "next/navigation";

const findPage = async (slug: string) => {
  await connectDB();
  const page = await PageModel.findOne({ slug: slug });

  if (!page) redirect("/dashboard");
  else return;
};

export async function getOptions(slug: string) {
  await findPage(slug);

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
  await findPage(slug);

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
  await findPage(slug);

  try {
    await connectDB();
    const findStyles: StylesExtendedType | null = await StylesModel.findOne({
      slug: slug,
    });

    if (!findStyles) {
      return null;
    }

    const styles = JSON.parse(JSON.stringify(findStyles.styles));

    return styles;
  } catch (error) {
    console.log(error);
    return null;
  }
}
