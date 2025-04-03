import { DashHeader } from "./_components/_header/dashHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashHeader />
      <main className="pb-28 md:px-[4%]">{children}</main>
    </>
  );
}
