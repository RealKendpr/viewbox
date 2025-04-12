import { DashHeader } from "./_components/_header/dashHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashHeader />
      <main className="h-full pb-28">{children}</main>
    </>
  );
}
