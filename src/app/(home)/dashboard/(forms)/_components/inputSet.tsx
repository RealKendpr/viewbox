import { useFormContext } from "react-hook-form";
import { Input } from "./input";

export function InputSet() {
  const { register } = useFormContext();

  return (
    <div className="grid gap-y-4">
      <div className="fieldset">
        <label htmlFor="avatar" className="fieldset-legend place-self-start">
          Pick an Avatar
        </label>
        <input type="file" id="avatar" className="file-input w-full" />
        <p className="fieldset-label">Max size 2MB</p>
      </div>
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
