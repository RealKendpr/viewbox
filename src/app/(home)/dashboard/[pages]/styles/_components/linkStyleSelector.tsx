"use client";

import { useFormContext } from "react-hook-form";

export function LinkStyleSelector({
  fieldName,
  currentStyle,
}: {
  fieldName: string;
  currentStyle: string;
}) {
  const styles = ["default", "soft", "outline", "ghost"];
  const { register } = useFormContext();

  return (
    <ul className="flex flex-wrap gap-3">
      {styles.map((i) => (
        <li key={i}>
          <input
            className="peer visibility-hidden absolute size-0"
            {...register(fieldName)}
            type="radio"
            name={fieldName}
            id={i}
            value={i}
            defaultChecked={i == currentStyle || i == "default"}
          />
          <label
            className={`btn peer-checked:btn-primary btn-soft capitalize`}
            htmlFor={i}
          >
            {i}
          </label>
        </li>
      ))}
    </ul>
  );
}
