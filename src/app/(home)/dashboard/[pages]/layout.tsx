import Tabs from "./_components/tabs";

export default function EditPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pages: string };
}) {
  return (
    <>
      <Tabs pageName={params.pages} />
      {children}
    </>
  );
}
