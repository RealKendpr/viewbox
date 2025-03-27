import { getActiveLayout } from "@/_lib/getPageConfig";
import "@/globals.css";
import "@[pages]/styles.css";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}>) {
  const { pages } = await params;
  const activeLayout = await getActiveLayout(pages);

  return (
    <html lang="en">
      <body className={`${activeLayout}-layout bg-base-300 min-h-svh`}>
        {children}
      </body>
    </html>
  );
}
