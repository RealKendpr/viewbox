import Link from "next/link";
import { DeleteAccountBtn } from "./deleteAccountBtn";

export default function DeleteAccountPage() {
  return (
    <div className="md:px-[4%]">
      <div className="card card-lg">
        <div className="card-body">
          <h2 className="card-title">Delete your account</h2>
          <p>
            Deleting your account will also delete all of the pages that are
            associated with it, and will no longer be accessible to the public;
            the page names will no longer be reserved to you and will be
            available for other users to take.
          </p>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" href="/dashboard">
              Go back to dashboard
            </Link>
            <DeleteAccountBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
