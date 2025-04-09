import { notFound } from "next/navigation";
import { PageForm } from "../_components/pageForm";
import { getPageForm } from "@/_lib/getPageData";

export default async function EditPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;
  const pageDetails = await getPageForm(pages);

  // redirect users if they try to visit a slug/page that dont exist on the database
  if (!pageDetails) notFound();

  return (
    <>
      <PageForm pageValue={pageDetails} title="Edit" />
    </>
  );
}
