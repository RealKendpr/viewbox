import { NextRequest, NextResponse } from "next/server";
import { hasSession } from "./_utils/hasSession";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublic = publicRoutes.includes(pathname);

  const session = await hasSession(request);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/dashboard/:path*", "/login", "/register"]
};
