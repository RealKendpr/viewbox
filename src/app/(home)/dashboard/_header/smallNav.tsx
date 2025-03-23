"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SmallNav() {
  const isDashboard = usePathname() == "/dashboard";

  return (
    isDashboard && (
      <div className="my-4 grid px-[4%]">
        <Link
          className="btn btn-secondary place-self-end"
          href={"/dashboard/create"}
        >
          Create Page
        </Link>
      </div>
    )
  );
}
