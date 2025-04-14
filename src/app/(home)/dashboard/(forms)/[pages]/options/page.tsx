import { getOptions } from "@/_lib/getPageConfig";
import OptionsForm from "./optionsForm";

export default async function OptionsPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  const defaultValues = await getOptions(pageName);

  return <OptionsForm slug={pageName} defaultValues={defaultValues} />;
}
