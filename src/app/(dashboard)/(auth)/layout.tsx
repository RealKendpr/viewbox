import { PublicHeader } from "@/_components/publicHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <PublicHeader />
      <main className="mx-[4%] grid place-items-center">{children}</main>
    </div>
  );
}
