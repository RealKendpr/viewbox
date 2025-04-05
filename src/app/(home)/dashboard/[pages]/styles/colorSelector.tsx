"use client";

import colors from "@/styles/colors.json";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export function SolidSelector({
  fieldName,
  currentStyle,
  transparent,
}: {
  fieldName: string;
  currentStyle: string;
  transparent?: boolean;
}) {
  const { register } = useFormContext();
  const [selected, setSelected] = useState<string>(currentStyle);

  return (
    <ul className="flex flex-wrap gap-2">
      {transparent && (
        <li>
          <input
            className="visibility-hidden peer absolute size-0"
            {...register(fieldName)}
            type="radio"
            id={`${fieldName}transparent`}
            value="transparent"
            // defaultChecked={currentStyle == "transparent"}
            onChange={() => setSelected("transparent")}
          />
          <label
            className={`grid size-12 place-items-center overflow-hidden rounded-full transition-opacity peer-checked:border-3 hover:cursor-pointer hover:opacity-75 ${selected == "transparent" && "border-3"}`}
            htmlFor={`${fieldName}transparent`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </label>
        </li>
      )}
      {colors.solid.map((i, index) => (
        <li key={i}>
          <input
            className="visibility-hidden peer absolute size-0"
            {...register(fieldName)}
            type="radio"
            id={fieldName + index + "solid"}
            value={i}
            // defaultChecked={currentStyle == i}
            onChange={() => setSelected(i)}
          />
          <label
            className={`block size-12 rounded-full transition-opacity peer-checked:border-3 hover:cursor-pointer hover:opacity-75 ${selected == i && "border-3"}`}
            style={{ background: i }}
            htmlFor={fieldName + index + "solid"}
          />
        </li>
      ))}
    </ul>
  );
}

export function GradientSelector({
  fieldName,
  currentStyle,
}: {
  fieldName: string;
  currentStyle: string;
}) {
  const { register } = useFormContext();
  const [selected, setSelected] = useState(currentStyle);

  return (
    <ul className="flex flex-wrap gap-2">
      {colors.gradient.map((i, index) => (
        <li key={i}>
          <input
            className="visibility-hidden peer absolute size-0"
            {...register(fieldName)}
            type="radio"
            id={fieldName + index + "gradient"}
            value={i}
            // defaultChecked={
            //   currentStyle?.replace(/\s/g, "") == i.replace(/\s/g, "")
            // }
            onChange={() => setSelected(i)}
          />
          <label
            className={`block size-12 rounded-full transition-opacity peer-checked:border-3 hover:cursor-pointer hover:opacity-75 ${selected == i && "border-3"}`}
            style={{ background: i }}
            htmlFor={fieldName + index + "gradient"}
          />
        </li>
      ))}
    </ul>
  );
}

export function MultiColorTabs({
  currentStyle,
  transparent,
}: {
  currentStyle: string;
  transparent?: boolean;
}) {
  const currentTab = () => {
    if (
      colors.solid.includes(currentStyle) ||
      currentStyle == "" ||
      currentStyle == "transparent"
    ) {
      return "solid";
    }
    if (colors.gradient.includes(currentStyle)) {
      return "gradient";
    }
    return "image";
  };

  const tabs = ["solid", "gradient"];
  const [openTab, setOpenTab] = useState<string>(currentTab());

  return (
    <>
      <div className="tabs tabs-box tabs-sms p-2" role="tablist">
        {tabs.map((i) => (
          <button
            key={i}
            className={`tab capitalize ${openTab == i && "tab-active"}`}
            type="button"
            onClick={() => setOpenTab(i)}
          >
            {i}
          </button>
        ))}
      </div>
      {openTab == "solid" ? (
        <SolidSelector
          fieldName="background"
          currentStyle={currentStyle}
          transparent={transparent}
        />
      ) : (
        <GradientSelector fieldName="background" currentStyle={currentStyle} />
      )}
    </>
  );
}
