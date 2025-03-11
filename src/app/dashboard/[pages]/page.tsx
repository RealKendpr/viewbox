import { notFound } from "next/navigation";
import { getPagesDetails } from "./getPageDetails";

export default async function EditPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;

  const pageDetailsResult = await getPagesDetails(pages);

  // redirect users if they try to visit a slug/page that dont exist on the database
  if (!pageDetailsResult) notFound();

  return <div>{pages}</div>;
}
