"use server";

import { z } from "zod";
import { UserType } from "@/components/form";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/_lib/session";
import { redirect } from "next/navigation";
import { getUser } from "@/_lib/mongodb/getUser";

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

// export async function Register(formData: UserType) {
//   const username = formData.username;
//   const password = formData.password;

//   console.log(formData);

//   try {
//     await connectDB();
//     const userFound = await UserModel.findOne({ username });
//     if (userFound) {
//       console.log("Username already exist");
//     }

//     const hashPassword = await bcrypt.hash(password, 12);
//     const user = new UserModel({
//       username: username,
//       password: hashPassword,
//     });

//     await user.save();
//   } catch (error) {
//     console.log(error);
//   }
// }
