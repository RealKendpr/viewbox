import { useFormContext } from "react-hook-form";

export function Input({
  label,
  name,
  placeholder
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const validationRule = {
    required: true
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
