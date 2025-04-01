import { StylesForm } from "./styleForm";

export default async function StylesPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;

  return <StylesForm slug={pageName} />;
}
