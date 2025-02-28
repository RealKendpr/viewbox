import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb/mongodb";
import UserModel from "@/lib/mongodb/models/User";
import bcrypt from "bcryptjs";

async function getUser(username: string) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ username });

    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          const user = await getUser(username);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        console.log("Invalid Credentials");
        return null;
      },
    }),
  ],
});
