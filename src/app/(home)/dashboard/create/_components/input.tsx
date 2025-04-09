import RequiredAlert from "@/_components/requiredAlert";
import { useFieldContext } from "@dashboard/hooks/form-context";

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
  required?: boolean;
}) {
  const field = useFieldContext<string>();
  const {
    state: {
      value,
      meta: { errors },
    },
  } = field;

  return (
    <div className="fieldset">
      <label className="fieldset-legend place-self-start" htmlFor={name}>
        {label}
      </label>
      <input
        className="input w-full"
        type="text"
        id={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {errors.length > 0 && <RequiredAlert errorMsg={errors[0]} />}
    </div>
  );
}
