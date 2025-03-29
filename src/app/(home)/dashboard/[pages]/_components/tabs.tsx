"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({ pageName }: { pageName: string }) {
  const tabs = ["edit", "layouts", "styles", "options"];

  const href = (tab: string) => {
    return tab === "edit"
      ? `/dashboard/${pageName}`
      : `/dashboard/${pageName}/${tab}`;
  };

  const pathname = usePathname().split("/");

  const isActive = (tab: string) => {
    if (pathname.includes(tab)) {
      return true;
    }
    if (tab === "edit" && pathname.length === 3) {
      return true;
    }
    return false;
  };

  return (
    <div className="tabs tabs-border mb-10 *:capitalize" role="tablist">
      {tabs.map((i) =>
        isActive(i) ? (
          <p className="tab-active tab" role="tab" key={i}>
            {i}
          </p>
        ) : (
          <Link className="tab" href={href(i)} role="tab" key={i}>
            {i}
          </Link>
        ),
      )}
    </div>
  );
}
