import mockPageData from "@/_mockData/document.json";
import Image from "next/image";

export function PageTable() {
  return (
    <div className="overflow-x-auto shadow-md border">
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
          <tr>
            <th className="hidden md:table-cell text-end">
              <div className="rounded-xl overflow-hidden inline-block">
                <Image
                  className="size-[64px] object-cover"
                  src={mockPageData.pageIcon}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </th>
            <th>
              <div>{mockPageData.name}</div>
            </th>
            <th>{mockPageData.createdAt}</th>
            <th>
              <button className="btn-ghost btn btn-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 32 32">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    d="M8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"></path>
                </svg>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
