"use server";

import { headers } from "next/headers";

export async function getPathname() {
  const headerList = headers();

  return (await headerList).get("x-pathname") || "";
}
