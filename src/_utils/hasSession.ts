import { decrypt } from "@/_lib/session";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function hasSession(request: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie, request.nextUrl.pathname);

  if (session?.userId) return true;
  else return false;
}
