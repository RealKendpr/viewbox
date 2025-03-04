import { useFormContext } from "react-hook-form";
import RequiredAlert from "./requiredAlert";

export function Inputs({
  name,
  label,
  pattern,
  placeholder,
  type,
  minL,
  maxL,
}: {
  name: string;
  label: string;
  pattern?: RegExp | undefined;
  placeholder?: string;
  type?: "password" | "text";
  minL: number;
  maxL?: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validationRule = {
    required: true,
    pattern: pattern,
    minLength: minL,
    maxLength: maxL,
  };

  return (
    <div>
      <label className="floating-label" htmlFor={name}>
        <span>{label}</span>
        <input
          className="input mt-4 mb-3 input-md w-full"
          id={name}
          type={type || "text"}
          placeholder={placeholder}
          {...register(name, validationRule)}
        />
      </label>
      {errors[name] && (
        <RequiredAlert
          errorMsg={`Please enter a valid ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
}
