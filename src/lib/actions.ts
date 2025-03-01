"use server";

import { UserType } from "@/components/form";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { connectDB } from "./mongodb/mongodb";
import UserModel from "./mongodb/models/User";
import bcrypt from "bcryptjs";

export async function authenticate(
  prevState: string | undefined,
  formData: UserType
) {
  const username = formData.username;
  const password = formData.password;

  try {
    await signIn("credentials", {
      redirectTo: "/dashboard",
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function SignOut() {
  await signOut({ redirectTo: "/login" });
}

export async function Register(formData: UserType) {
  const username = formData.username;
  const password = formData.password;

  console.log(formData);

  try {
    await connectDB();
    const userFound = await UserModel.findOne({ username });
    if (userFound) {
      console.log("Username already exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      username: username,
      password: hashPassword,
    });

    await user.save();
  } catch (error) {
    console.log(error);
  }
}
