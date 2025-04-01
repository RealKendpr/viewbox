"use client";

import colors from "@/styles/colors.json";
import { useState } from "react";
import { SubmitBtn } from "../../_components/submitBtns";

export function BackgroundSelector({ slug }: { slug: string }) {
  const tabs = ["solid", "gradient", "image"];

  const [openTab, setOpenTab] = useState<string>("solid");
  const [selectedColor, setSelectedColor] = useState<string>("");

  return (
    <form>
      <div>
        <h1>Styles</h1>
      </div>
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
                    onClick={() => setSelectedColor(i)}
                  ></button>
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
                    onClick={() => setSelectedColor(i)}
                  ></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}
