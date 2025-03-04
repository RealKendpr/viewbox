import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./_lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.includes(pathname);
  const isPublic = publicRoutes.includes(pathname);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie, pathname);

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublic && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
