import type { Metadata } from "next";
import "@/globals.css";
import Link from "next/link";

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
        <header className="absolute p-2.5">
          <Link className="text-2xl font-bold text-accent" href={"/"}>
            One Page
          </Link>
        </header>
        <main className="hero-content min-h-screen">{children}</main>
      </body>
    </html>
  );
}
