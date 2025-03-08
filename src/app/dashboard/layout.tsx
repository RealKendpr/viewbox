import { DashNav } from "./_components/dashNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashNav />
      <main className="mb-28 px-[4%]">{children}</main>
    </>
  );
}
