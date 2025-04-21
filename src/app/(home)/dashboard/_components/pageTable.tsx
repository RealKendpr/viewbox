import Image from "next/image";
import { PagePreviewType } from "@/types/PageTypes";
import { DropdownOptions } from "./_header/dropdownOptions";
import { NoPages } from "./noPages";
import { getPagesPreview } from "@/_lib/getPageData";
import { Suspense } from "react";
import { PageListSkeleton } from "@/_components/loadingComponents";

export function PageItemRow({ pages }: { pages: PagePreviewType[] }) {
  const createdDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <tbody>
      {pages.map((i, index) => (
        <tr key={index}>
          <td className="hidden text-end md:table-cell">
            <div className="inline-block h-[64px] w-[64px] overflow-hidden rounded-xl">
              {i.pageIcon.url && (
                <Image
                  className="size-[64px] object-cover"
                  src={i.pageIcon.url}
                  alt=""
                  width={100}
                  height={100}
                />
              )}
            </div>
          </td>
          <td>
            <div className="truncate">{i.pageName}</div>
          </td>
          <td className="hidden sm:table-cell">{createdDate(i.createdAt)}</td>
          <td className="text-center">
            <DropdownOptions slug={i.slug} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export async function PageTable() {
  const pages: PagePreviewType[] | null = await getPagesPreview();

  return (
    <>
      {pages == null || pages.length < 1 ? (
        <NoPages />
      ) : (
        <table className="table table-fixed shadow-md">
          <thead>
            <tr className="*:capitalize">
              <th className="hidden md:table-cell"></th>
              <th>Name</th>
              <th className="hidden sm:table-cell">Created at</th>
              <th className="min-w-[82px]"></th>
            </tr>
          </thead>
          <Suspense fallback={<PageListSkeleton count={3} />}>
            <PageItemRow pages={pages} />
          </Suspense>
        </table>
      )}
    </>
  );
}
