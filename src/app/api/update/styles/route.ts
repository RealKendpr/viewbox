import { getUserId } from "@/_lib/getUserData";
import { NextRequest, NextResponse } from "next/server";
import { StylesSchema } from "../../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { StylesExtendedType } from "@/types/PageTypes";
import { StylesModel } from "@/_lib/mongodb/models/ConfigModels";
import { uploadThing } from "../../_uploadthing/uploadthing";

export async function PATCH(request: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const formData = await request.formData();
  const { slug, background, restFormData } = Object.fromEntries(formData);

  const validaData = StylesSchema.safeParse({
    validSlug: slug,
    styles: {
      validBackground: background,
      ...JSON.parse(restFormData as string),
    },
  });
  if (!validaData.success)
    return NextResponse.json({ error: validaData.error }, { status: 400 });

  const { validSlug, ...restValidData } = validaData.data;
  const { validBackground, ...restStyles } = restValidData.styles;

  const getBackground = async (): Promise<string | null> => {
    if (!(validBackground instanceof File)) {
      return validBackground;
    }

    const uploadedBackground = await uploadThing(validBackground);

    if (!uploadedBackground) return null;
    return uploadedBackground.url;
  };

  const pageBackground = await getBackground();

  if (pageBackground === null) {
    return NextResponse.json(
      { error: "Error in saving the background." },
      { status: 400 },
    );
  }

  const newStyle = {
    background: pageBackground,
    ...restStyles,
  };

  try {
    await connectDB();

    const findStyles: StylesExtendedType | null =
      await StylesModel.findOneAndUpdate(
        { slug: validSlug, userId: userId },
        { styles: newStyle },
        { upsert: true },
      );

    await findStyles?.save();
    return NextResponse.json({ message: "Styles updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
