import { PageType } from "@/types/PageTypes";
import Image from "next/image";
// import { favicon } from "@/app/_utils/getFavicon";
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
            {page.pageIcon ? (
              <Image
                className="size-20 object-cover"
                src={page.pageIcon}
                width={80}
                height={80}
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
                {/* <img src={favicon(item.linkUrl)} width={24} height={24} alt="" /> */}
                <span className="z-10">{item.linkName}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
