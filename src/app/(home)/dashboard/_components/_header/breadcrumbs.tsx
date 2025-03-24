"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const isDashboard = usePathname() == "/dashboard";
  const isCreatePage = usePathname() === "/dashboard/create";

  // just taking the last part of the current path and removing the dashes (-), and is being capitalize with CSS
  // I didnt over complicate the crumbs since its not very deep
  const editPagePath = usePathname().split("/").slice(1); // take out the first empty string

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {editPagePath.map(
          (i, index) =>
            index !== 2 && (
              <li key={index}>
                {i == "dashboard" ? (
                  editPagePath.length >= 2 ? (
                    <Link href={`/${i}`}>{i}</Link>
                  ) : (
                    <span>{i}</span>
                  )
                ) : (
                  <span>{i}</span>
                )}
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
