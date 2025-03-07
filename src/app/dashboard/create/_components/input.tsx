import RequiredAlert from "@/_components/requiredAlert";
import { useFormContext } from "react-hook-form";

export function Input({
  label,
  name,
  placeholder,
  type,
  required,
  index
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
    formState: { errors }
  } = useFormContext();

  const validationRule = {
    required: required,
    pattern:
      type === "url"
        ? /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        : undefined
  };

  const ErrorAlert = () => {
    const arrayFieldName = name.substring(name.lastIndexOf(".") + 1);

    // errors for fields inside the  useFieldArray
    if (index !== undefined)
      return (
        // errors.websites[index] is not an array or is undefined on first page load since there is no errors yet, so, erros.websites needs to be checked as an array before checking which field has an error, else the application will crash.
        // this is the way I check for field errors because I cant find a documentation/guide on how to retrieve errors from useFieldArray
        // this also took me hours :/
        Array.isArray(errors.websites) &&
        errors.websites[index][arrayFieldName] && (
          <RequiredAlert
            errorMsg={`Please enter a valid ${
              type === "url" ? "URL" : label.toLowerCase()
            }`}
          />
        )
      );

    // errors for normal fields
    return (
      errors[name] && (
        <RequiredAlert
          errorMsg={`Please enter a valid ${
            type === "url" ? "URL" : label.toLowerCase()
          }`}
        />
      )
    );
  };

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
      <ErrorAlert />
    </div>
  );
}
