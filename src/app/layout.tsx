import type { Metadata } from "next";
import "@/globals.css";

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
      <body className="bg-base-100 min-h-svh">{children}</body>
    </html>
  );
}
