import { PublicHeader } from "@/_components/publicHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen grid place-items-center">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
