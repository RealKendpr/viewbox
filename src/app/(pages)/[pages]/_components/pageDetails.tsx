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
    <>
      <style>{`
        .card-copy {
        color: ${styles?.textColor};
        }

        .link-list {
          & li {
            background: ${styles?.linkBackground};
            color: ${styles?.linkColor};
            border-color: ${styles?.linkBorder};
          }

          & .colored-card {
            position: relative;

            &::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
            }

            &:hover::after {
              background: ${styles?.cardColor};
              filter: invert(1);
            }

            &:hover {
              color: ${styles?.cardColor};
            }
          }
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
              className={`btn btn-soft btn-block overflow-hidden bg-transparent px-0 transition-all duration-300 ${styles?.cardColor != "transparent" && styles?.linkBackground == "transparent" ? "colored-card after:transition-all after:duration-300" : "transform-gpu hover:scale-105 hover:bg-amber-50/15"}`}
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
