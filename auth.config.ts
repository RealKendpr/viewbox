import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        else return NextResponse.redirect(new URL("/login", nextUrl)); // Redirect unauthenticated users to login page
      }
      if (isLoggedIn && isOnLogin) {
        return true;
      }
      return true;
    },
  },
  providers: [], // empty for now
} satisfies NextAuthConfig;
