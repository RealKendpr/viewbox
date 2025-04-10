"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "../hooks/form-context";
import { useStore } from "@tanstack/react-form";

export function SubmitBtn() {
  const form = useFormContext();
  const [status, setStatus] = useState<"error" | "success" | null>(null);

  const [isSubmitting, errors, isSubmitSuccessful] = useStore(
    form.store,
    (state) => [state.isSubmitting, state.errors, state.isSubmitSuccessful],
  );

  useEffect(() => {
    if (errors[0] && errors[0].formError) {
      setStatus("error");

      const resetState = setTimeout(() => {
        setStatus(null);
      }, 2000);

      return () => clearTimeout(resetState);
    }

    if (isSubmitSuccessful && !errors[0]) {
      setStatus("success");

      const resetState = setTimeout(() => {
        setStatus(null);
      }, 2000);

      return () => clearTimeout(resetState);
    }
  }, [isSubmitSuccessful, errors, setStatus]);

  return (
    <>
      <button className="btn btn-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
        <span>Save</span>
      </button>
      <div
        className={`[&.show]:toast fixed -right-full bottom-0 z-50 ${status == "success" && "show"} `}
      >
        <div className="alert alert-success">
          <span>Updated successfully.</span>
        </div>
      </div>
      <div
        className={`[&.show]:toast fixed -right-full bottom-0 z-50 ${status == "error" && "show"} `}
      >
        <div className="alert alert-error">
          <span>Failed to update.</span>
        </div>
      </div>
    </>
  );
}
