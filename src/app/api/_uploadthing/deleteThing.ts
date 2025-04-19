import { utapi } from "./uploadthing";

export async function deleteThing(key: string) {
  if (key === "") {
    return;
  }

  await utapi.deleteFiles(key);
  return;
}
