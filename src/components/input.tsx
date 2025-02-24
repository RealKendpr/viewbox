import { useFormContext } from "react-hook-form";

export function Inputs({
  name,
  label,
  pattern,
  placeholder,
}: {
  name: string;
  label: string;
  pattern?: RegExp | undefined;
  placeholder?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validationRule = {
    required: true,
    pattern: pattern,
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...register(name, validationRule)}
      />
    </div>
  );
}
