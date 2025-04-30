import { getUserId } from "@/_lib/getUserData";
import { OptionsExtendedType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { optionsSchema } from "../../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { OptionsModel } from "@/_lib/mongodb/models/ConfigModels";

export async function PATCH(request: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const data = await request.json();
  if (!data) return NextResponse.json({ error: "no content" }, { status: 204 });

  const result = optionsSchema.safeParse(data);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  const { slug, ...rest } = result.data;
  try {
    await connectDB();

    const findOptions: OptionsExtendedType | null =
      await OptionsModel.findOneAndUpdate(
        { slug: slug, userId: userId },
        { ...rest },
        { upsert: true },
      );

    await findOptions?.save();
    return NextResponse.json({ message: "Options updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
