import { getUserData } from "@/_lib/getUserData";
import { NextRequest, NextResponse } from "next/server";
import { StylesSchema } from "../../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { StylesExtendedType } from "@/types/PageTypes";
import { StylesModel } from "@/_lib/mongodb/models/ConfigModels";

export async function PATCH(request: NextRequest) {
  const data = await request.json();
  if (!data) return NextResponse.json({ error: "no content" }, { status: 204 });

  const userId = await getUserData("userId");
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const result = StylesSchema.safeParse(data);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  const { slug, ...rest } = result.data;

  try {
    await connectDB();

    const findStyles: StylesExtendedType | null =
      await StylesModel.findOneAndUpdate(
        { slug: slug, userId: userId },
        { ...rest },
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
