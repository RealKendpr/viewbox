"use client";

import Modal from "@/_components/modal";
import { deleteUser } from "@/app/_lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteAccountBtn() {
  const router = useRouter();

  const [openPromt, setOpenPromt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteUser({
      callbackURL: "/login",
    });
    setLoading(false);
    router.push("/login");
  };

  return (
    <>
      <button className="btn btn-warning" onClick={() => setOpenPromt(true)}>
        Delete
      </button>
      <Modal isOpen={openPromt} setIsOpen={setOpenPromt}>
        <div>
          <p className="text-warning flex items-center gap-x-2 font-semibold">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <span>Delete Account!</span>
          </p>
          <p className="my-4 text-sm">
            Are you sure you wan&apos;t to delete your account? This action
            cannot be undone.
          </p>
          <div className="flex justify-around gap-x-2">
            <button
              className="btn btn-warning grow"
              type="button"
              onClick={() => handleDelete()}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <span>Yes</span>
              )}
            </button>
            <button
              className="btn grow"
              type="button"
              onClick={() => setOpenPromt(false)}
            >
              No!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
