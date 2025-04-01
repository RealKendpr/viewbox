import { BackgroundSelector } from "./background";

export default async function StylesPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  return <BackgroundSelector slug={pageName} />;
}
