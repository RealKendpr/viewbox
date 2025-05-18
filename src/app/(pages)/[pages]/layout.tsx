import { getActiveLayout, getStyles } from "@/_lib/getPageConfig";
import "./pageLayout.css";
import "./publicPageStyles.css";
import testUrl from "@/app/(home)/dashboard/(forms)/_utils/testUrl";
import Image from "next/image";

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

  const background = styles?.background || "";
  const imageBackground = testUrl(background!);

  return (
    <html lang="en">
      <body
        className={`${activeLayout}-layout bg-base-300 min-h-svh`}
        style={{ background: imageBackground ? undefined : background }}
      >
        {imageBackground && (
          <Image src={background} alt="" fill={true} objectFit="cover" />
        )}
        {children}
      </body>
    </html>
  );
}
