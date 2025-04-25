import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;
