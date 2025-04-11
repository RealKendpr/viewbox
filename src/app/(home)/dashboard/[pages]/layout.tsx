import Tabs from "./_components/tabs";

export default async function EditPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}) {
  return (
    <div className="mx-[4%] max-w-md min-[28rem]:mx-auto">
      <Tabs pageName={(await params).pages} />
      {children}
    </div>
  );
}
