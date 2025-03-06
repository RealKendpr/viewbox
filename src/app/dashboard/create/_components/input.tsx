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
      <label className="fieldset-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type="text"
        id={name}
        placeholder={placeholder}
        {...register(name, validationRule)}
      />
      <p>{errors[name]?.message?.toString()}</p>
    </div>
  );
}
