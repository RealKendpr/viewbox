import { pageExist } from "@/_lib/getPageData";
import Tabs from "./_components/tabs";
import { notFound } from "next/navigation";

export default async function EditPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;
  const page = await pageExist(pages);

  if (!page) return notFound();

  return (
    <div className="mx-[4%] h-full max-w-md min-[28rem]:mx-auto">
      <Tabs pageName={(await params).pages} />
      <>{children}</>
    </div>
  );
}
