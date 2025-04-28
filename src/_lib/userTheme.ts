"use server";

import { getUserId } from "./getUserData";
import { connectDB } from "./mongodb/mongodb";
import mongoose from "mongoose";

export async function updateUserTheme(theme: "dark" | "light") {
  const userId = await getUserId();
  if (!userId) return;

  try {
    await connectDB();
    const collection = mongoose.connection.collection("users");

    await collection.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId.createFromHexString(userId) },
      { $set: { theme: theme } },
    );

    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getUserTheme(): Promise<"light" | "dark" | undefined> {
  const userId = await getUserId();
  if (!userId) return;

  try {
    await connectDB();
    const collection = mongoose.connection.collection("users");
    const currentTheme = await collection.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(userId),
    });
    return currentTheme?.theme;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
