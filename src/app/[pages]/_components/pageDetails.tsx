import { PageType } from "@/types/PageTypes";
import { Metadata } from "next";
import Image from "next/image";

const favicon = (url: string) => {
  const domain = new URL(url).hostname;
  const iconSrc = `https://api.faviconkit.com/${domain}/32`;

  return iconSrc;
};

export function PageDetails({ page }: { page: PageType }) {
  return (
    <div className="mx-auto min-h-[60%] w-[calc(80%+12px)] rounded-lg border p-3">
      <div className="mb-6">
        <div className="bg-accent mx-auto size-16">
          {page.pageIcon && (
            <Image src={page.pageIcon} width={100} height={100} alt="" />
          )}
        </div>
        <h1 className="text-center text-xl font-semibold">{page.pageName}</h1>
      </div>
      <ul className="grid gap-y-4">
        {page.websites.map((item, index) => (
          <li className="flex items-center gap-x-2" key={index}>
            <div className="size-6">
              <img
                src={item.webIcon ? item.webIcon : favicon(item.webUrl)}
                width={24}
                height={24}
                alt=""
              />
            </div>
            <a className="link link-hover" href={item.webUrl}>
              {item.webName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
