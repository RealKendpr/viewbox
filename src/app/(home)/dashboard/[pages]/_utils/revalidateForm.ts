"use server";

import { revalidatePath } from "next/cache";

export async function revalidateForm(path: string) {
  revalidatePath(`/dashboard/${path}`);
}
