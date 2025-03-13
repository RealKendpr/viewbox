import Image from "next/image";
import { getPagesInfo } from "../getPagesInfo";
import { PagePreviewType } from "@/types/PageTypes";
import { DropdownOptions } from "./dropdownOptions";
import { NoPages } from "./noPages";

export async function PagePreview() {
  const pages: any = await getPagesInfo();
  const pagesResult: PagePreviewType[] = await pages;

  const createdDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <div className="shadow-md">
      {pagesResult.length >= 1 ? (
        <table className="table">
          <thead>
            <tr>
              <th className="hidden md:table-cell"></th>
              <th>Name</th>
              <th>created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagesResult.map((i, index) => (
              <tr key={index}>
                <th className="hidden text-end md:table-cell">
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
                </th>
                <th>
                  <div>{i.pageName}</div>
                </th>
                <th>{createdDate(i.createdAt)}</th>
                <th>
                  <DropdownOptions slug={i.slug} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoPages />
      )}
    </div>
  );
}
