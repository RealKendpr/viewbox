import { PageType } from "@/types/PageTypes";
import Image from "next/image";
import { favicon } from "@/app/_utils/getFavicon";
import { UserAvatar } from "@/_components/userAvatar";
import { funEmoji } from "@dicebear/collection";
import { getOptions, getStyles } from "@/_lib/getPageConfig";

export async function PageDetails({
  page,
  slug,
}: {
  page: PageType;
  slug: string;
}) {
  const options = await getOptions(slug);
  const styles = await getStyles(slug);

  return (
    <div
      className="card bg-base-100 rounded-lg"
      style={{ background: styles?.cardColor }}
    >
      <div className="card-header">
        <div className="profile-image">
          {page.pageIcon ? (
            <Image
              className="size-20 object-cover"
              src={page.pageIcon}
              width={80}
              height={80}
              alt=""
            />
          ) : (
            <UserAvatar username={page.pageName} size={150} style={funEmoji} />
          )}
        </div>
        <div className="card-copy">
          <h1 className="text-xl font-semibold">{page.pageName}</h1>
          <p className="text-sm">{page.pageDescription}</p>
        </div>
      </div>
      <ul className="link-list">
        {page.links.map((item, index) => (
          <li key={index}>
            <a
              className="btn btn-soft btn-block"
              href={item.linkUrl}
              target={options?.newTab ? "_blank" : "_self"}
            >
              {/* <img src={favicon(item.linkUrl)} width={24} height={24} alt="" /> */}
              <span>{item.linkName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
