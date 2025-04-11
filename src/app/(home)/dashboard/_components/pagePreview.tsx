import Image from "next/image";
import { PagePreviewType } from "@/types/PageTypes";
import { DropdownOptions } from "./_header/dropdownOptions";
import { NoPages } from "./noPages";
import { getPagesPreview } from "@/_lib/getPageData";

export async function PagePreview() {
  const pages: PagePreviewType[] | null = await getPagesPreview();

  const createdDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <div className="shadow-md">
      {!pages ? (
        <NoPages />
      ) : (
        <table className="table table-fixed">
          <thead>
            <tr className="*:capitalize">
              <th className="hidden md:table-cell"></th>
              <th>Name</th>
              <th className="hidden md:table-cell">Created at</th>
              <th className="min-w-[82px]"></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((i, index) => (
              <tr key={index}>
                <td className="hidden text-end md:table-cell">
                  <div className="inline-block h-[64px] w-[64px] overflow-hidden rounded-xl">
                    {i.pageIcon && (
                      <Image
                        className="size-[64px] object-cover"
                        src={i.pageIcon}
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
                <td className="hidden sm:table-cell">
                  {createdDate(i.createdAt)}
                </td>
                <td className="text-center">
                  <DropdownOptions slug={i.slug} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
