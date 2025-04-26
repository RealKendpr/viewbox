import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      (session.user.id as any) = token.id;
      return session;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;
