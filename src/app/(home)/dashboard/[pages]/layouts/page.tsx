export default function LayoutPage({ params }: { params: { pages: string } }) {
  const pageName = params.pages;

  return <div>{pageName} Layout selection page</div>;
}
