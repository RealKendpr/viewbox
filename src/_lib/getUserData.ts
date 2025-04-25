import "server-only";
import { cache } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUserId = cache(async () => {
  const user = (await auth())?.user;

  if (!user) return redirect("/login");
  else return user.id;
});

export const getUserImage = async () => (await auth())?.user?.image;
