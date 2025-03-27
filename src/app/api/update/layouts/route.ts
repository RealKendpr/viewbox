import { getUserData } from "@/_lib/getUserData";
import { NextRequest, NextResponse } from "next/server";
import { layoutSchema } from "@api/_schema/pageSchema";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { ActiveLayoutModel } from "@/_lib/mongodb/models/ConfigModels";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  if (!data) return NextResponse.json({ error: "no content" }, { status: 204 });

  const userId = await getUserData("userId");
  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const result = layoutSchema.safeParse(data);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  const { slug, active } = result.data;
  try {
    await connectDB();

    const findLayouts: any | null = await ActiveLayoutModel.findOneAndUpdate(
      { slug: slug, userId: userId },
      { activeLayout: active },
      { upsert: true },
    );

    await findLayouts?.save();
    return NextResponse.json({ message: "Options updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
