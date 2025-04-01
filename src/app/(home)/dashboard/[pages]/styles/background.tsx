"use client";

import colors from "@/styles/colors.json";
import { StylesType } from "@/types/PageTypes";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export function BackgroundSelector({
  setValue,
}: {
  setValue: UseFormSetValue<StylesType>;
}) {
  const tabs = ["solid", "gradient", "image"];
  const [openTab, setOpenTab] = useState<string>("solid");

  return (
    <div className="bg-base-200/50 collapse">
      <label className="collapse-title" htmlFor="backgrounds">
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
          <ul className="flex flex-wrap gap-1.5">
            {colors.solid.map((i) => (
              <li key={i}>
                <button
                  className={`size-12 rounded-full hover:cursor-pointer`}
                  style={{ backgroundColor: i }}
                  type="button"
                  onClick={() => setValue("background", i)}
                />
              </li>
            ))}
          </ul>
        )}
        {openTab == "gradient" && (
          <ul className="flex flex-wrap gap-1.5">
            {colors.gradient.map((i) => (
              <li key={i}>
                <button
                  className={`size-12 rounded-full hover:cursor-pointer`}
                  style={{ background: i }}
                  type="button"
                  onClick={() => setValue("background", i)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
