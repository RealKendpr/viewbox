import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function FormError() {
  const {
    clearErrors,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (errors.root) {
      const resetState = setTimeout(() => {
        clearErrors("root");
      }, 2000);

      return () => clearTimeout(resetState);
    }
  }, [errors, clearErrors]);

  return (
    <div
      className={`[&.show]:toast fixed -right-full bottom-0 z-50 ${errors.root && "show"}`}
    >
      <div className="alert alert-error">
        <span>{errors.root?.message || "Failed to update"}</span>
      </div>
    </div>
  );
}
