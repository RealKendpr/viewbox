import type { Metadata } from "next";
import "@app/(home)/global.css";

export const metadata: Metadata = {
  title: "One Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dim" lang="en">
      <body className="bg-base-100 min-h-svh">{children}</body>
    </html>
  );
}
