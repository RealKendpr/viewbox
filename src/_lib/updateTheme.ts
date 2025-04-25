"use server";

import { getUserId } from "./getUserData";
import UserModel from "./mongodb/models/UserModel";
import { connectDB } from "./mongodb/mongodb";

export async function updateTheme(
  theme?: "dark" | "light",
): Promise<"light" | "dark" | undefined> {
  const userId = await getUserId();

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
