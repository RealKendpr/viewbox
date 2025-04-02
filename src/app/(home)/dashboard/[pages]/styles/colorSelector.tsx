"use client";

import colors from "@/styles/colors.json";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function ColorSelector({
  currentStyle,
  fieldName,
  label,
  isOpen,
}: {
  currentStyle: string;
  fieldName: string;
  label: string;
  isOpen?: boolean;
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

  const tabs = ["solid", "gradient", "image"];
  const [openTab, setOpenTab] = useState<string>(currentTab());

  const { setValue } = useFormContext();
  const [color, setColor] = useState<string>(currentStyle);

  const handleSelection = (i: string) => {
    setValue(fieldName, i);
    setColor(i);
  };

  return (
    <div className="bg-base-200/50 collapse">
      <label
        className="collapse-title font-medium capitalize"
        htmlFor="backgrounds"
      >
        {label}
      </label>
      <input
        type="checkbox"
        name="backgrounds"
        id="backgrounds"
        defaultChecked={isOpen ? isOpen : false}
      />
      <div className="collapse-content">
        <div className="tabs tabs-box tabs-sm mb-5 p-2" role="tablist">
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
        {openTab == "solid" && (
          <ul className="flex flex-wrap gap-2">
            {fieldName == "cardColor" && (
              <li>
                <button
                  className={`grid size-12 place-items-center overflow-hidden rounded-full hover:cursor-pointer ${color == "transparent" ? "border-3" : null}`}
                  type="button"
                  onClick={() => handleSelection("transparent")}
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
                </button>
              </li>
            )}
            {colors.solid.map((i) => (
              <li key={i}>
                <button
                  className={`size-12 rounded-full transition-opacity hover:cursor-pointer hover:opacity-75 ${color == i ? "border-3" : null}`}
                  style={{ background: i }}
                  type="button"
                  onClick={() => handleSelection(i)}
                />
              </li>
            ))}
          </ul>
        )}
        {openTab == "gradient" && (
          <ul className="flex flex-wrap gap-2">
            {colors.gradient.map((i) => (
              <li key={i}>
                <button
                  className={`size-12 rounded-full hover:cursor-pointer hover:opacity-75 ${i == color && "border-3"}`}
                  style={{ background: i }}
                  type="button"
                  onClick={() => handleSelection(i)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
