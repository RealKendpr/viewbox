import "@[pages]/pages.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base-300 min-h-svh">{children}</body>
    </html>
  );
}
