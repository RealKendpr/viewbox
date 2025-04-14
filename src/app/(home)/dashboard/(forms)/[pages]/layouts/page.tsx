import { getActiveLayout } from "@/_lib/getPageConfig";
import { LayoutsForm } from "./layoutsForm";

export default async function LayoutPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const slug = (await params).pages;
  const activeLayout = await getActiveLayout(slug);

  return <LayoutsForm slug={slug} activeLayout={activeLayout} />;
}
