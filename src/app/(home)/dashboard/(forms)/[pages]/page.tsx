import { EditForm } from "./_components/editForm";
import { getPageForm } from "@/_lib/getPageData";

export default async function EditPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;
  const pageDetails = await getPageForm(pages);

  if (!pageDetails) return;

  return <EditForm pageDetails={pageDetails} slug={pages} />;
}
