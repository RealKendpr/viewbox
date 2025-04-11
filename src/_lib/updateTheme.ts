"use server";

import { getUserData } from "./getUserData";
import UserModel from "./mongodb/models/UserModel";
import { connectDB } from "./mongodb/mongodb";

export async function updateTheme(
  theme?: "dark" | "light",
): Promise<"light" | "dark" | undefined> {
  const userId = (await getUserData("userId")) as string;

  if (!userId) return;

  try {
    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { userTheme: theme } },
    );

    if (!theme) {
      return user.userTheme;
    }
    user.save();
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
