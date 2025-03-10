import Image from "next/image";
import { getPages } from "../getPages";

interface PagesResultType {
  pageName: string;
  pageIcon: string;
  createdAt: Date;
}

export async function PageTable() {
  const pages: any = await getPages();
  const pagesResult: PagesResultType[] = await pages;

  const createdDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <div className="overflow-x-auto border shadow-md">
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
          {pagesResult &&
            pagesResult.map((i, index) => (
              <tr key={index}>
                <th className="hidden text-end md:table-cell">
                  <div className="inline-block overflow-hidden rounded-xl">
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
                  <button className="btn-ghost btn btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        d="M8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                      ></path>
                    </svg>
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
