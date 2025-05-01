import "server-only";
import { cache } from "react";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getUserId = cache(async () => {
  const session = await getSession();

  const userId = session?.user.id;

  if (!session) return redirect("/login");
  else return userId;
});

export const getUserImage = async () => (await getSession())?.user.image;

export const hasSession = async () =>
  (await getSession()) !== null ? true : false;
