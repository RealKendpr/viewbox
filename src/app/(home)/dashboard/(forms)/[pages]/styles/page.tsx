import { getStyles } from "@/_lib/getPageConfig";
import { StylesForm } from "./styleForm";

export default async function StylesPage({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const pageName = (await params).pages;
  const styles = await getStyles(pageName);

  return <StylesForm styles={styles} slug={pageName} />;
}
