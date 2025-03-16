import { getPathname } from "../create/_utils/getPathname";

export async function deletePage(pageId: string, router: any) {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "text/plain",
      "X-Pathname": await getPathname(),
    },
    body: pageId,
  });

  const result = await response.json();

  if (!response.ok) {
    console.log(result);
    return;
  }
  router.push("/dashboard");
}
