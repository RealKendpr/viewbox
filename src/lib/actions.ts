"use server";

import { UserType } from "@/components/form";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";

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
