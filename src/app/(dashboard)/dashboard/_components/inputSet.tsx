import { useFormContext } from "react-hook-form";
import { AddWebsite } from "../create/_components/addWebsite";
import { Input } from "../create/_components/input";

export function InputSet() {
  const { register } = useFormContext();

  return (
    <>
      <div className="grid gap-y-4">
        <Input
          label="External icon URL"
          name="pageIcon"
          placeholder="https://icons.com/icon"
          type="url"
        />
        <Input
          label="Page Title"
          name="pageName"
          placeholder="Awesome Delight"
          required={true}
        />
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your bio</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Bio"
            id="pageDescription"
            {...register("pageDescription", { max: 100 })}
          ></textarea>
          <div className="fieldset-label">Optional</div>
        </fieldset>
      </div>
      <fieldset className="fieldset my-2">
        <legend className="fieldset-legend">Websites</legend>
        <AddWebsite />
      </fieldset>
    </>
  );
}
