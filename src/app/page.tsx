import { PublicHeader } from "@/_components/publicHeader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="mx-[4%] grid min-h-screen place-items-center">
        <div>
          <h1 className="mb-6 text-3xl font-medium">
            All your social links in <br />
            <span className="font-bold">one page</span>
          </h1>
          <div className="flex gap-x-3">
            <Link className="btn-primary btn" href="/login">
              Log In
            </Link>
            <Link className="btn-secondary btn" href="/register">
              Create an Account
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
