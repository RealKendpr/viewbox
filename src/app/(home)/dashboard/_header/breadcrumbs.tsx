"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const isDashboard = usePathname() == "/dashboard";
  const isCreatePage = usePathname() === "/dashboard/create";

  // just taking the last part of the current path and removing the dashes (-), and is being capitalize with CSS
  // I didnt over complicate the crumbs since its not very deep
  const editPagePath = usePathname().split("/").pop()?.replace("-", " ");

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          {isDashboard ? (
            <span>Dashboard</span>
          ) : (
            <Link href={"/dashboard"}>Dashboard</Link>
          )}
        </li>
        {isCreatePage && (
          <li>
            <p>Create</p>
          </li>
        )}
        {!isCreatePage && !isDashboard && (
          <li className="capitalize">
            <p>{editPagePath}</p>
          </li>
        )}
      </ul>
    </div>
  );
}
