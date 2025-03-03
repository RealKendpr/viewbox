import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <p className="text-2xl">One Page</p> */}
      <h1 className="text-4xl mb-6 font-medium">
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
  );
}
