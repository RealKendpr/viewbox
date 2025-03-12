import Link from "next/link";

export function PublicHeader() {
  return (
    <header>
      <div className="navbar bg-base-100 px-[4%] shadow-sm">
        <Link className="text-accent text-2xl font-bold" href={"/"}>
          One Page
        </Link>
      </div>
    </header>
  );
}
