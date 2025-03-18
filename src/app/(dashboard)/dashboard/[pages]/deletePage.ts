export async function deletePage(pageId: string, router: any) {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "text/plain",
    },
    body: pageId,
  });

  if (!response.ok) {
    return;
  }
  router.push("/dashboard");
}
