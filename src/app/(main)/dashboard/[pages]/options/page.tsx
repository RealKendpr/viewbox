export default function OptionsPage({ params }: { params: { pages: string } }) {
  const pageName = params.pages;

  return <div>{pageName} Options selection page</div>;
}
