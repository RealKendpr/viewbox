import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import RequiredAlert from "@/_components/requiredAlert";
import { pageNameRegex } from "@/app/api/_utils/regEx";

export function Input({
  label,
  name,
  placeholder,
  type,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: "url" | "text";
  required?: boolean | undefined;
}) {
  const {
    register,
    // formState: { errors },
  } = useFormContext();

  const validationRule = {
    required: required,
    pattern:
      type === "url"
        ? /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        : name === "pageName"
          ? pageNameRegex
          : undefined,
  };

  return (
    <div className="fieldset">
      <label htmlFor={name} className="fieldset-legend place-self-start">
        {label}
      </label>
      <input
        className="input w-full"
        type="text"
        id={name}
        placeholder={placeholder}
        {...register(name, validationRule)}
      />
      <ErrorMessage
        name={name}
        render={() => (
          <RequiredAlert
            errorMsg={`Please enter a valid ${
              type === "url" ? "URL" : label.toLowerCase()
            }`}
          />
        )}
      />
    </div>
  );
}
