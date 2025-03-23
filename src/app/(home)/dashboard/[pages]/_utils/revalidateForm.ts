"use server";

import { revalidatePath } from "next/cache";

export async function revalidateForm(name: string) {
  revalidatePath(`/dashboard/${name}`);
}
