import { AddWebsite } from "../create/_components/addWebsite";
import { Input } from "../create/_components/input";

export function InputSet() {
  return (
    <>
      <div className="grid gap-y-4">
        <Input
          label="Page Title"
          name="pageName"
          placeholder="Awesome Delight"
          required={true}
        />
        <Input
          label="External icon URL"
          name="pageIcon"
          placeholder="https://icons.com/icon"
          type="url"
        />
      </div>
      <fieldset className="fieldset my-2">
        <legend className="fieldset-legend">Websites</legend>
        <AddWebsite />
      </fieldset>
    </>
  );
}
