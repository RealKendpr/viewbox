import LogoutBtn from "./logout";
import { SmallNav } from "./smallNav";
import { getUserImage } from "@/_lib/getUserData";
import { Breadcrumbs } from "./breadcrumbs";
import Image from "next/image";
import { ThemeSwitch } from "./themeSwitcher";
import { updateTheme } from "@/_lib/updateTheme";

export async function DashHeader() {
  const imageSource = await getUserImage();

  const theme = await updateTheme();

  return (
    <header>
      <div className="navbar bg-base-100 px-[4%] shadow-sm">
        <div className="flex-1">
          <Breadcrumbs />
        </div>
        <ThemeSwitch currentTheme={theme} />
        <div className="ml-3 flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="size-9 grow rounded-full">
                {imageSource && (
                  <Image
                    className="size-8 rounded-full object-cover"
                    src={imageSource}
                    alt=""
                    fill={true}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SmallNav />
    </header>
  );
}
