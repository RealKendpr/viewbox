"use client";

import colors from "@/styles/colors.json";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function BackgroundSelector({ background }: { background: string }) {
  const currentTab = () => {
    if (colors.solid.includes(background) || background == "") {
      return "solid";
    }
    if (colors.gradient.includes(background)) {
      return "gradient";
    }
    return "image";
  };

  const tabs = ["solid", "gradient", "image"];
  const [openTab, setOpenTab] = useState<string>(currentTab());

  const { setValue } = useFormContext();
  const [color, setColor] = useState<string>(background);

  const handleSelection = (i: string) => {
    setValue("background", i);
    setColor(i);
  };

  return (
    <div className="bg-base-200/50 collapse">
      <label className="collapse-title font-medium" htmlFor="backgrounds">
        Backgrounds
      </label>
      <input
        type="checkbox"
        name="backgrounds"
        id="backgrounds"
        defaultChecked={true}
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
            {colors.solid.map((i) => (
              <li key={i}>
                <button
                  className={`size-12 rounded-full hover:cursor-pointer ${i == color ? "border-2" : null}`}
                  style={{ backgroundColor: i }}
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
                  className={`size-12 rounded-full hover:cursor-pointer ${i == color && "border-3"}`}
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
