import { DashHeader } from "./_components/dashHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashHeader />
      <main className="mb-28 px-[4%]">{children}</main>
    </>
  );
}
