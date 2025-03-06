import { useFormContext } from "react-hook-form";

export function Input({
  label,
  name,
  placeholder,
  type,
  required
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: "url" | "text";
  required?: boolean;
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const validationRule = {
    required: required,
    pattern:
      type === "url"
        ? /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        : undefined
  };

  return (
    <div>
      <label className="fieldset-label mb-2 inline-flex" htmlFor={name}>
        {label}
      </label>
      <input
        className="input w-full"
        type="text"
        id={name}
        placeholder={placeholder}
        {...register(name, validationRule)}
      />
      <p>{errors[name]?.message?.toString()}</p>
    </div>
  );
}
