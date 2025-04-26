import { getActiveLayout, getStyles } from "@/_lib/getPageConfig";
import "./pageLayout.css";
import "./publicPageStyles.css";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}>) {
  const { pages } = await params;
  const activeLayout = await getActiveLayout(pages);
  const styles = await getStyles(pages);

  return (
    <html lang="en">
      <body
        className={`${activeLayout}-layout bg-base-300 min-h-svh`}
        style={{ background: styles?.background }}
      >
        {children}
      </body>
    </html>
  );
}
