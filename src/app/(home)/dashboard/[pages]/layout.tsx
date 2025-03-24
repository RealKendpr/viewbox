import Tabs from "./_components/tabs";

export default async function EditPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pages: string }>;
}) {
  return (
    <>
      <Tabs pageName={(await params).pages} />
      {children}
    </>
  );
}
