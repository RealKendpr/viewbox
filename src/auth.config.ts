import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
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
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;
