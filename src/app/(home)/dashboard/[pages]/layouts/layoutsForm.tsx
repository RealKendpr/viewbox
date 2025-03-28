"use client";

import layouts from "@/layouts/layouts.json";
import { revalidateForm } from "../_utils/revalidateForm";
import { useState } from "react";
import Modal from "@/_components/modal";

export function LayoutsForm({
  slug,
  activeLayout,
}: {
  slug: string;
  activeLayout: string | null;
}) {
  const [updated, setUpdated] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    const selectedLayout = formData.get("layout");

    if (selectedLayout === activeLayout) {
      setUpdated(true);
      return;
    }

    const formValues = {
      slug: slug,
      active: selectedLayout,
    };

    const response = await fetch("/api/update/layouts", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }
    setUpdated(true);
    revalidateForm(`/dashboard${slug}/layouts`);
  };

  return (
    <>
      <form action={handleSubmit}>
        <div className="flex justify-between">
          {layouts.layouts?.map((i) => (
            <div key={i}>
              <label className="label" htmlFor={i}>
                {i}
              </label>
              <input
                className="radio"
                type="radio"
                name="layout"
                id={i}
                value={i}
                defaultChecked={
                  activeLayout ? i === activeLayout : i === "default"
                }
              />
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary fixed right-[4%] bottom-[4%]"
          type="submit"
        >
          Save changes
        </button>
      </form>
      <Modal isOpen={updated} setIsOpen={setUpdated}>
        <p className="text-success flex items-center gap-x-2 font-semibold">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>Updated successfully</span>
        </p>
      </Modal>
    </>
  );
}
