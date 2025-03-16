"use server";

import UserModel from "./mongodb/models/UserModel";
import { connectDB } from "./mongodb/mongodb";
import { cache } from "react";
import { hasSession } from "./session";
import { UserDocumentType } from "@/types/UserTypes";

// this is to get user's data such as username to for the avatar, and also to get the user's _id for when they create pages
export const getUserData = cache(
  async (data: "username" | "userId" | "allData") => {
    const session = await hasSession();

    await connectDB();
    const userData: UserDocumentType | null = await UserModel.findOne({
      _id: session?.userId,
    });

    if (!userData) return null;

    switch (data) {
      case "username":
        return getUsername(userData);
      case "userId":
        return getUserId(userData);
      case "allData":
        return userData;
      default:
        return null;
    }
  },
);

function getUsername(userData: UserDocumentType) {
  return userData?.username;
}

function getUserId(userData: UserDocumentType) {
  return userData._id;
}
