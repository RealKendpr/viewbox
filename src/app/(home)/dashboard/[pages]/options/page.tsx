import { getOptions } from "@/_lib/getPageConfig";
import OptionsForm from "./optionsForm";

export default async function OptionsPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  const defaultValues = await getOptions(pageName);

  return (
    <div>
      <h1 className="text-lg font-medium capitalize">{pageName} Options</h1>
      <OptionsForm slug={pageName} defaultValues={defaultValues} />
    </div>
  );
}
