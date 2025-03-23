export default function StylesPage({ params }: { params: { pages: string } }) {
  const pageName = params.pages;

  return <div>{pageName} Styles selection page</div>;
}
