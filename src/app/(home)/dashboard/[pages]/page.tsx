import { notFound } from "next/navigation";
import { EditForm } from "./_components/editForm";
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

  // the page details is an object and must be converted to string first because if not, there will be an error: Call Stack Trace Exceeded
  const pageDetailsResult = JSON.stringify(pageDetails);

  return (
    <div>
      <EditForm pageDetails={pageDetailsResult} />
    </div>
  );
}
