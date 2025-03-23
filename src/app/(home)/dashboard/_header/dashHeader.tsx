import Link from "next/link";
import LogoutBtn from "./logout";
import { SmallNav } from "./smallNav";
import { getUserData } from "@/_lib/getUserData";
import { UserAvatar } from "./userAvatar";
import { Breadcrumbs } from "./breadcrumbs";

export async function DashHeader() {
  const username = (await getUserData("username")) as string;

  return (
    <header>
      <div className="navbar bg-base-100 px-[4%] shadow-sm">
        <div className="flex-1">
          <Breadcrumbs />
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <UserAvatar username={username} />
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
