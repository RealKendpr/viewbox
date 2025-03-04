import LogoutBtn from "./_components/logout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between p-3">
        <span className="text-2xl font-bold text-accent">One Page</span>
        <LogoutBtn />
      </header>
      <main className="px-3">{children}</main>
    </>
  );
}
