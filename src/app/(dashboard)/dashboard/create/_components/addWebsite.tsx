import { useFieldArray } from "react-hook-form";
import { WatchUrl, WatchTitle } from "./fieldWatcher";
import { AccordionContents } from "./accordionContent";

export function AddWebsite() {
  const { fields, append, remove } = useFieldArray({
    name: "websites"
  });

  return (
    <>
      <ul className="grid gap-y-3 mb-4">
        {fields.map((field, index) => (
          <li
            className="collapse collapse-arrow bg-base-100 border-base-200 border"
            key={field.id}>
            <input
              type="checkbox"
              name={`accordion-${index + 1}`}
              defaultChecked
            />
            <div className="collapse-title font-semibold flex items-center gap-x-2">
              <div className="size-8 rounded overflow-hidden">
                <WatchUrl name={`websites.${index}.webUrl`} />
              </div>
              <WatchTitle name={`websites.${index}.webName`} />
            </div>
            <div className="collapse-content grid gap-y-3">
              <div className="grid gap-y-3">
                <AccordionContents index={index} />
              </div>
              {fields.length > 1 && (
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
            webName: "",
            webUrl: "",
            webIcon: ""
          })
        }>
        Add
      </button>
    </>
  );
}
