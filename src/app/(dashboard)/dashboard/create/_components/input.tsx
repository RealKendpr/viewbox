import { useFormContext } from "react-hook-form";
import { FieldErrorAlert } from "./fieldErrorAlert";

export function Input({
  label,
  name,
  placeholder,
  type,
  required,
  index,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: "url" | "text";
  required?: boolean;
  index?: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validationRule = {
    required: required,
    pattern:
      type === "url"
        ? /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        : undefined,
  };

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{label}</legend>
        <input
          className="input w-full"
          type="text"
          id={name}
          placeholder={placeholder}
          {...register(name, validationRule)}
        />
        <FieldErrorAlert
          name={name}
          index={index}
          errors={errors}
          errorMsg={`Please enter a valid ${
            type === "url" ? "URL" : label.toLowerCase()
          }`}
        />
        {!required && <p className="fieldset-label">Optional</p>}
      </fieldset>
    </div>
  );
}
