"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function FormState() {
  const [status, setStatus] = useState<"error" | "success" | null>(null);

  const {
    formState: { isSubmitted, errors },
    reset,
  } = useFormContext();

  const resetState = useCallback(() => {
    const resetState = setTimeout(() => {
      reset(undefined, { keepValues: true });
      setStatus(null);
    }, 2000);

    return () => clearTimeout(resetState);
  }, [reset]);

  useEffect(() => {
    if (errors.root) {
      setStatus("error");

      return resetState();
    }

    if (isSubmitted && !errors.root) {
      setStatus("success");

      return resetState();
    }
  }, [errors, setStatus, isSubmitted, resetState]);

  return (
    <>
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
          <span>{errors.root?.message || "Failed to update"}</span>
        </div>
      </div>
    </>
  );
}
