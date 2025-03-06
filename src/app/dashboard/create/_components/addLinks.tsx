import { useFieldArray } from "react-hook-form";
import { Input } from "./input";
import { WatchTitle } from "./watchLinkTitle";

export function AddLinks() {
  const { fields, append, remove } = useFieldArray({
    name: "links"
  });

  return (
    <>
      <ul className="grid gap-y-3 mb-4">
        {fields.map((field, index) => (
          <li
            className="collapse bg-base-100 border-base-200 border"
            key={field.id}>
            <input
              type="checkbox"
              name={`accordion-${index + 1}`}
              defaultChecked
            />
            <div className="collapse-title font-semibold">
              <WatchTitle name={`links.${index}.title`} />
            </div>
            <div className="collapse-content grid gap-y-3">
              <div className="grid gap-y-3">
                <Input
                  label="Link Title"
                  name={`links.${index}.title` as const}
                />
                <Input label="Link" name={`links.${index}.href` as const} />
                <Input
                  label="Link's Icon"
                  name={`links.${index}.icon` as const}
                />
              </div>
              {index >= 1 && (
                <button
                  className="btn btn-warning btn-sm place-self-end"
                  type="button"
                  onClick={() => remove(index)}>
                  DELETE
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() =>
          append({
            linkTitle: "",
            link: "",
            linkIcon: ""
          })
        }>
        Add Link
      </button>
    </>
  );
}
