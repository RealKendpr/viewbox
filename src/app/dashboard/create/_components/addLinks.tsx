import { useFieldArray } from "react-hook-form";
import { Input } from "./input";
import { WatchTitle } from "./watchLinkTitle";

export function AddLinks() {
  const { fields, append, remove } = useFieldArray({
    name: "links"
  });

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Links</legend>
      <ul>
        {fields.map((field, index) => (
          <li
            className="collapse bg-base-100 border-base-200 border"
            key={field.id}>
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-semibold">
              <WatchTitle name={`links.${index}.title`} />
            </div>
            <div className="collapse-content">
              <Input
                label="Link Title"
                name={`links.${index}.title` as const}
              />
              <Input label="Link" name={`links.${index}.href` as const} />
              <Input
                label="Link's Icon"
                name={`links.${index}.icon` as const}
              />
              {index >= 1 && (
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          append({
            linkTitle: "",
            link: "",
            linkIcon: ""
          })
        }>
        APPEND
      </button>
    </fieldset>
  );
}
