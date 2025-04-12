import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "One Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base-100 grid min-h-svh min-w-[375px] grid-rows-[auto_1fr]">
        {children}
      </body>
    </html>
  );
}
