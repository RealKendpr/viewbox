export async function deletePage(pageId: string, router: any) {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "text/plain",
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
