"use server";

import { z } from "zod";
import { UserType } from "@/app/(auth)/_components/loginForm";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/_lib/session";
import { redirect } from "next/navigation";
import { connectDB } from "@/_lib/mongodb/mongodb";
import UserModel from "@/_lib/mongodb/models/User";

const userSchema = z.object({
  username: z.string().min(6),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

async function getUser(username: string) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ username });

    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function login(prevState: any, formData: UserType) {
  const result = userSchema.safeParse(formData);

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
  const result = userSchema.safeParse(formData);

  if (result.success) {
    const { username, password } = result.data;

    try {
      const userFound = await getUser(username);

      if (!userFound) {
        const hashPassword = await bcrypt.hash(password, 12);

        const user = new UserModel({
          username: username,
          password: hashPassword,
        });
        await user.save();
        return {
          status: "success",
        };
      }
      return {
        errors: {
          username: "Username already exist",
        },
      };
    } catch (error) {
      return null;
    }
  } else
    return {
      errors: result.error.flatten().fieldErrors,
    };
}
