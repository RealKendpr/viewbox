import { PageType } from "@/types/PageTypes";
import Image from "next/image";

const favicon = (url: string) => {
  const domain = new URL(url).hostname;
  const iconSrc = `https://api.faviconkit.com/${domain}/32`;

  return iconSrc;
};

export function PageDetails({ page }: { page: PageType }) {
  return (
    <div className="bg-base-100 mx-auto min-h-[60%] w-[calc(80%+12px)] rounded-lg p-3 pt-12">
      <div className="mb-6">
        <div className="mx-auto size-20">
          {page.pageIcon && (
            <Image
              className="size-20 rounded-full object-cover"
              src={page.pageIcon}
              width={80}
              height={80}
              alt=""
            />
          )}
        </div>
        <h1 className="text-center text-xl font-semibold">{page.pageName}</h1>
        <p className="text-center text-sm">{page.pageDescription}</p>
      </div>
      <ul className="grid gap-y-4">
        {page.websites.map((item, index) => (
          <li key={index}>
            <a
              className="btn btn-soft btn-block grid grid-cols-[24px_1fr]"
              href={item.webUrl}
            >
              <img
                src={item.webIcon ? item.webIcon : favicon(item.webUrl)}
                width={24}
                height={24}
                alt=""
              />
              <span>{item.webName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
