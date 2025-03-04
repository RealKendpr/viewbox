import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="absolute p-2.5">
      <Link className="text-2xl font-bold text-accent" href={"/"}>
        One Page
      </Link>
    </header>
  );
}
