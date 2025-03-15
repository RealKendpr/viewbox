import { notFound } from "next/navigation";
import { getPage } from "./getPage";
import { PageDetails } from "./_components/pageDetails";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pages: string }>;
}): Promise<Metadata> {
  const { pages } = await params;
  const pageResult = await getPage(pages);

  return {
    title: pageResult?.pageName,
    icons: {
      icon: pageResult?.pageIcon,
    },
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
    <>
      <div className="grid min-h-svh place-items-center">
        <PageDetails page={pageResult} />
      </div>
    </>
  );
}
