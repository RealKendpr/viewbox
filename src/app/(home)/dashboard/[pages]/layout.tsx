import Tabs from "./_components/tabs";

export default async function EditPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}) {
  return (
    <div className="mx-[4%]">
      <Tabs pageName={(await params).pages} />
      {children}
    </div>
  );
}
