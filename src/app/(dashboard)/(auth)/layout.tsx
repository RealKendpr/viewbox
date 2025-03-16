import { PublicHeader } from "@/_components/publicHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="mx-[4%] grid min-h-screen place-items-center">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
