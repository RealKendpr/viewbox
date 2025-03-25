import OptionsForm from "./optionsForm";

export default async function OptionsPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  return (
    <div>
      <h1 className="text-lg font-medium">{pageName} Options</h1>
      <OptionsForm pageName={pageName} />
    </div>
  );
}
