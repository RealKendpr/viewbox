import { PageType } from "@/types/PageTypes";
import Image from "next/image";
import { favicon } from "@/app/_utils/getFavicon";
import { UserAvatar } from "@/_components/userAvatar";
import { funEmoji } from "@dicebear/collection";
import { getOptions } from "@/_lib/getPageConfig";

export async function PageDetails({
  page,
  slug,
}: {
  page: PageType;

  slug: string;
}) {
  const options = await getOptions(slug);

  return (
    <div className="bg-base-100 mx-auto min-h-[60%] w-[calc(80%+12px)] rounded-lg px-4 py-10">
      <div className="mb-4">
        <div className="mx-auto size-21">
          {page.pageIcon ? (
            <Image
              className="size-20 rounded-full object-cover"
              src={page.pageIcon}
              width={80}
              height={80}
              alt=""
            />
          ) : (
            <UserAvatar
              className="size-20 rounded-full object-cover"
              username={page.pageName}
              size={80}
              style={funEmoji}
            />
          )}
        </div>
        <h1 className="mt-4 mb-5 text-center text-xl font-semibold">
          {page.pageName}
        </h1>
        <p className="text-center text-sm">{page.pageDescription}</p>
      </div>
      <ul className="grid gap-y-3">
        {page.links.map((item, index) => (
          <li key={index}>
            <a
              className="btn btn-soft btn-block grid grid-cols-[24px_1fr]"
              href={item.linkUrl}
              target={options?.newTab ? "_blank" : "_self"}
            >
              <img src={favicon(item.linkUrl)} width={24} height={24} alt="" />
              <span>{item.linkName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
