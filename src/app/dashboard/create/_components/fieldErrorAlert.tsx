import { FieldErrors, FieldValues } from "react-hook-form";
import RequiredAlert from "@/_components/requiredAlert";

export function FieldErrorAlert({
  name,
  index,
  errors,
  errorMsg
}: {
  name: string;
  index?: number;
  errors: FieldErrors<FieldValues>;
  errorMsg: string;
}) {
  // errors for fields inside the  useFieldArray
  if (index !== undefined) {
    const arrayFieldName = name.substring(name.lastIndexOf(".") + 1);

    if (
      // each object must be checked before proceeding, this is to prevent app from crashing when websites[x] has a present error and the user tries to add another website[y]
      // reproduce: submit an empty form, then add another website fields
      Array.isArray(errors.websites) &&
      errors.websites[index] &&
      errors.websites[index][arrayFieldName]
    ) {
      return (
        // errors.websites[index] is not an array or is undefined on first page load since there is no errors yet, so, erros.websites needs to be checked as an array before checking which field has an error, else the application will crash.
        // this is the way I check for field errors because I cant find a documentation/guide on how to retrieve errors from useFieldArray
        // this also took me hours :/
        <RequiredAlert errorMsg={errorMsg} />
      );
    }
  }
  // errors for normal fields
  else if (errors[name]) return <RequiredAlert errorMsg={errorMsg} />;
}
