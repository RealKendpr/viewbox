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
      <body className="bg-base-100">
        <main className="hero-content min-h-screen">{children}</main>
      </body>
    </html>
  );
}
