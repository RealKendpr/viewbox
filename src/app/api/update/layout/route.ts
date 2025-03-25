import { getUserData } from "@/_lib/getUserData";
import { OptionsType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { optionsSchema } from "../../_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import OptionsModel from "@/_lib/mongodb/models/ConfigModels";

export async function PUT(request: NextRequest) {
  const data: OptionsType = await request.json();
  if (!data) return NextResponse.json({ error: "no content" }, { status: 204 });

  const userId = await getUserData("userId");
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const result = optionsSchema.safeParse(data);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  const { pageName, newTab } = result.data;
  try {
    await connectDB();

    const findOptions: OptionsType | null = await OptionsModel.findOneAndUpdate(
      { pageName: pageName, userId: userId },
      { newTab: newTab },
      { upsert: true },
    );

    await findOptions?.save();
    return NextResponse.json(
      { message: "Selected layout updated" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
