import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import { IconDropzone } from "./dropzone/iconDropzone";

export function InputSet() {
  const { register } = useFormContext();

  return (
    <div className="grid gap-y-4">
      <IconDropzone />
      <Input
        label="Page Title"
        name="pageName"
        placeholder="Awesome Delight"
        required={true}
      />
      <div className="fieldset">
        <label
          htmlFor="pageDescription"
          className="fieldset-legend place-self-start"
        >
          Your bio
        </label>
        <textarea
          className="textarea h-11 w-full"
          placeholder="Bio"
          id="pageDescription"
          {...register("pageDescription", { max: 100 })}
        ></textarea>
        <div className="fieldset-label">Optional</div>
      </div>
    </div>
  );
}
