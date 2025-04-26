import { PageType } from "@/types/PageTypes";
import Image from "next/image";
import { UserAvatar } from "@/_components/userAvatar";
import { funEmoji } from "@dicebear/collection";
import { getOptions, getStyles } from "@/_lib/getPageConfig";
import { getFavicon } from "@/app/_utils/getFavicon";

export async function PageDetails({
  page,
  slug,
}: {
  page: PageType;
  slug: string;
}) {
  const options = await getOptions(slug);
  const styles = await getStyles(slug);

  const pageIcon = !(page.pageIcon instanceof File) ? page.pageIcon.url : "";

  const linkStyle = {
    default: "",
    soft: "btn-soft",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  return (
    <>
      <style>{`
        :root {
        ${styles?.textColor && `--color-base-content: ${styles?.textColor};`}
        }
        .link-list li {
        ${styles?.linkBackground && `--btn-color: ${styles?.linkBackground};`}
        ${styles?.linkColor && `--color-base-content: ${styles?.linkColor};`}
        }
      `}</style>
      <div
        className="card bg-base-100 rounded-lg"
        style={{ background: styles?.cardColor }}
      >
        <div className="card-header">
          <div className="profile-image">
            {pageIcon ? (
              <Image
                className="mx-auto size-24! object-cover"
                src={pageIcon}
                width={96}
                height={96}
                alt=""
              />
            ) : (
              <UserAvatar
                username={page.pageName}
                size={150}
                style={funEmoji}
              />
            )}
          </div>
          <div className="card-copy">
            <h1 className="text-xl font-semibold">{page.pageName}</h1>
            <p className="text-sm">{page.pageDescription}</p>
          </div>
        </div>
        <ul className="link-list">
          {page.links.map((item, index) => (
            <li
              className={`btn btn-block overflow-hidden px-0 ${styles?.linkStyle ? linkStyle[styles?.linkStyle] : ""}`}
              key={index}
            >
              <a
                className="grid size-full place-items-center transition-all duration-300"
                href={item.linkUrl}
                target={options?.newTab ? "_blank" : "_self"}
              >
                <Image src={getFavicon(item.linkUrl)} fill={true} alt="" />
                <span className="z-10">{item.linkName}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
