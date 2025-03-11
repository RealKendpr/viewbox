import UserModel from "./mongodb/models/UserModel";
import { connectDB } from "./mongodb/mongodb";
import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "./session";

// this is to get user's data such as username to for the avatar, and also to get the user's _id for when they create pages
export const getUserData = cache(async (pathname: string) => {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie, pathname);
  const _id = await session?.userId;

  try {
    await connectDB();
    const userData = await UserModel.findOne({ _id });

    return userData;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
});
