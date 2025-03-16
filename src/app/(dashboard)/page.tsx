import { PublicHeader } from "@/_components/publicHeader";
import { hasSession } from "@/_lib/session";
import Link from "next/link";
import { getPathname } from "./dashboard/create/_utils/getPathname";

export default async function Home() {
  const isLoggedIn = await hasSession(await getPathname());

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <PublicHeader />
      <main className="mx-[4%] grid place-items-center">
        <div>
          <h1 className="mb-6 text-3xl font-medium">
            All your social links in <br />
            <span className="font-bold">one page</span>
          </h1>
          <div className="flex gap-x-3">
            {!isLoggedIn ? (
              <>
                <Link className="btn-primary btn" href="/login">
                  Log In
                </Link>
                <Link className="btn-secondary btn" href="/register">
                  Create an Account
                </Link>
              </>
            ) : (
              <Link className="btn-primary btn" href="/dashboard">
                Go to dashboard
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
