"use server";

import { getUserId } from "./getUserData";
import { connectDB } from "./mongodb/mongodb";
import mongoose from "mongoose";

export async function updateUserTheme(theme: "dark" | "light") {
  const userId = await getUserId();
  if (!userId) return;

  try {
    await connectDB();
    const collection = mongoose.connection.collection("user");

    await collection.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId.createFromHexString(userId) },
      { $set: { userTheme: theme } },
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
    const collection = mongoose.connection.collection("user");

    const userData = await collection.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(userId),
    });

    return userData?.userTheme;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
