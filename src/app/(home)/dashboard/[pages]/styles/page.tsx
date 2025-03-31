import { BackgroundSelector } from "./background";

export default async function StylesPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  return (
    <div>
      <div>
        <h1>Styles</h1>
      </div>
      <div>
        <BackgroundSelector slug={pageName} />
      </div>
    </div>
  );
}
