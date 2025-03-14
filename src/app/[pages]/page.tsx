import { notFound } from "next/navigation";
import { getPage } from "./getPage";
import Link from "next/link";

export default async function Pages({
  params,
}: {
  params: Promise<{ pages: string }>;
}) {
  const { pages } = await params;

  const pageResult = await getPage(pages);
  if (!pageResult) notFound();

  return (
    <div>
      <div>{pageResult.pageName}</div>
      <ul>
        {pageResult.websites.map((i) => (
          <li>
            <Link href={i.webUrl}>{i.webName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
