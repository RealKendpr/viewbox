import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectDB } from "./lib/mongodb/mongodb";
import UserModel from "./lib/mongodb/models/User";
import bcrypt from "bcryptjs";

async function getUser(email: string) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email });

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
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
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
