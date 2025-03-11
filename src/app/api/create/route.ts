import { getUserData } from "@/_lib/getUserData";
import PageModel from "@/_lib/mongodb/models/PageModel";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { FormPageType } from "@/types/PageTypes";
import { NextRequest, NextResponse } from "next/server";
import { pageSchema } from "../_schema/pageSchema";

export async function POST(request: NextRequest) {
  const pathname = request.headers.get("X-Pathname");
  const data: FormPageType = await request.json();

  if (!data || pathname == null)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
    );

  const userData = await getUserData(pathname);
  const userId = userData?._id;

  if (!userId)
    return NextResponse.json(
      { error: "request is unauthenticated" },
      { status: 401 },
    );

  const result = pageSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(result.error);
  }

  const { pageName, pageIcon, websites } = result.data;
  const getSlug = pageName.trim().replace(/\s+/g, "-").toLowerCase();

  try {
    await connectDB();
    const page = await new PageModel({
      pageName: pageName,
      pageIcon: pageIcon,
      slug: getSlug,
      userId: userId,
      websites: websites,
    });

    await page.save();

    return NextResponse.json(
      { message: "a new resource was created" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
