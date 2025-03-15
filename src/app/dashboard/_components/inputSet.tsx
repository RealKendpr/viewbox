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
        <textarea
          className="textarea"
          id="pageDescription"
          {...register("pageDescription")}
        />
      </div>
      <fieldset className="fieldset my-2">
        <legend className="fieldset-legend">Websites</legend>
        <AddWebsite />
      </fieldset>
    </>
  );
}
