import { DashNav } from "./_components/dashNav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashNav />
      <main className="mx-[4%]">{children}</main>
    </>
  );
}
