import { getUserData } from "@/_lib/getUserData";
import PageModel from "@/_lib/mongodb/models/Page";
import { connectDB } from "@/_lib/mongodb/mongodb";
import { PageType } from "@/app/dashboard/create/_components/createForm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const websitesSchema = z.object({
  webName: z.string(),
  webUrl: z.string().url(),
  webIcon: z.string().optional(),
});

const pageSchema = z.object({
  pageName: z.string(),
  pageIcon: z.string().optional(),
  websites: z.array(websitesSchema),
});

export async function POST(request: NextRequest) {
  const pathname = request.headers.get("X-Pathname");
  const data: PageType = await request.json();

  if (!data || pathname == null)
    return NextResponse.json(
      { error: "empty request not accepted" },
      { status: 400 },
    );

  const userId = await getUserData(pathname);

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
      userId: userId.id,
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
