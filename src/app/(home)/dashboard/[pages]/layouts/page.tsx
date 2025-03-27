import { getActiveLayout } from "@/_lib/getPageConfig";
import { LayoutsForm } from "./layoutsForm";

export default async function LayoutPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const slug = (await params).pages;
  const activeLayout = await getActiveLayout(slug);

  return (
    <div>
      <h1 className="text-lg font-medium capitalize">
        {slug} Layout selection page
      </h1>
      <LayoutsForm slug={slug} activeLayout={activeLayout} />
    </div>
  );
}
