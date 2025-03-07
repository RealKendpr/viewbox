import RequiredAlert from "@/_components/requiredAlert";
// import { useEffect } from "react";
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

  // useEffect(() => {
  //   console.log(errors["page-title"]);

  //   errors.links?.map((i: any) => {
  //     console.log(i["title"], i["href"]);
  //   });
  // });

  return (
    <div>
      <label className="fieldset-label inline-flex" htmlFor={name}>
        {label}
      </label>
      <input
        className="input w-full mt-4 mb-3"
        type="text"
        id={name}
        placeholder={placeholder}
        {...register(name, validationRule)}
      />
      {errors[name] && (
        <RequiredAlert
          errorMsg={`Please enter a valid ${
            type === "url" ? "URL" : label.toLowerCase()
          }`}
        />
      )}
    </div>
  );
}
