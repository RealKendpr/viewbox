"use server";

import { z } from "zod";
import { UserType } from "@/components/loginForm";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/_lib/session";
import { redirect } from "next/navigation";
import { getUser } from "@/_lib/mongodb/getUser";
import UserModel from "@/_lib/mongodb/models/User";

export async function login(prevState: any, formData: UserType) {
  const loginSchema = z.object({
    username: z.string().min(6),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  const result = loginSchema.safeParse(formData);

  if (result.success) {
    const { username, password } = result.data;

    const user = await getUser(username);
    if (!user) {
      return {
        errors: {
          username: ["Invalid username or password"],
        },
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      await createSession(user.id);

      console.log("A user logged in");
      redirect("/dashboard");
    }
  } else
    return {
      errors: result.error.flatten().fieldErrors,
    };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function register(formData: UserType) {
  const username = formData.username;
  const password = formData.password;

  try {
    const userFound = await getUser(username);
    if (!userFound) {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        username: username,
        password: hashPassword,
      });
      await user.save();
      return true;
    } else throw new Error("username already exist");
  } catch (error) {
    console.error((error as Error).message);
  }
}
