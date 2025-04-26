import { notFound } from "next/navigation";
import { PageDetails } from "./_components/pageDetails";
import { Metadata } from "next";
import { getPage } from "@/_lib/getPageData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pages: string }>;
}): Promise<Metadata> {
  const { pages } = await params;
  const pageResult = await getPage(pages);

  return {
    title: pageResult?.pageName,
  };
}

export default async function Pages({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;
  const pageResult = await getPage(pages);

  if (!pageResult) return notFound();

  return (
    <main className="grid min-h-svh place-items-center">
      <PageDetails page={pageResult} slug={pages} />
    </main>
  );
}
