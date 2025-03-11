import Link from "next/link";
import Image from "next/image";
import { getPagesInfo } from "../getPagesInfo";
import { PagePreviewType } from "@/types/PageTypes";

export async function PageTable() {
  const pages: any = await getPagesInfo();
  const pagesResult: PagePreviewType[] = await pages;

  const createdDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <div className="overflow-x-auto shadow-md">
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
                <th className="">
                  <Link
                    className="btn-ghost btn btn-square"
                    href={`/dashboard/${i.slug}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                      ></path>
                    </svg>
                  </Link>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
