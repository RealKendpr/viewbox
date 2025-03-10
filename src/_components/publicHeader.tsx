import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="px-[4%] pt-2.5">
      <Link className="text-accent text-2xl font-bold" href={"/"}>
        One Page
      </Link>
    </header>
  );
}
