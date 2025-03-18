import { PageType, WebsiteType } from "@/types/PageTypes";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../create/_components/input";
import { favicon } from "@/app/_utils/getFavicon";
import { useState } from "react";
import Modal from "@/_components/modal";

export default function AddWebsite({
  methods,
  website,
  setWebsite,
}: {
  methods: UseFormReturn<PageType, undefined>;
  website: WebsiteType[];
  setWebsite: React.Dispatch<React.SetStateAction<WebsiteType[]>>;
}) {
  const [openField, setOPenField] = useState<boolean>(false);

  const addWebsite = () => {
    const urlPattern =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const newWebsite = methods.watch("websites.0");
    const webUrl = urlPattern.test(newWebsite.webUrl);

    if (newWebsite.webName === "") {
      methods.setError("websites.0.webName", {
        type: "required",
      });
    } else methods.clearErrors("websites.0.webName");

    if (!webUrl) {
      methods.setError("websites.0.webUrl", {
        type: "pattern",
      });
    } else methods.clearErrors("websites.0.webUrl");

    if (newWebsite.webName && webUrl) {
      setWebsite((prev) => [...prev, newWebsite]);
      methods.setValue("websites.0", { webName: "", webUrl: "" });
      setOPenField(false);
    }
  };

  return (
    <>
      <ul>
        {website.map((item, index) => (
          <li className="flex items-center justify-between" key={index}>
            <div className="flex gap-x-2">
              <img src={favicon(item.webUrl)} width={24} height={24} alt="" />
              <span>{item.webName}</span>
            </div>
            <button className="btn btn-circle btn-ghost" type="button">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-dash w-full"
        type="button"
        onClick={() => setOPenField(true)}
      >
        Add
      </button>
      <Modal isOpen={openField} setIsOpen={setOPenField}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Websites</legend>
          <Input
            label="Website Name"
            name="websites.0.webName"
            placeholder="Youtube"
          />
          <Input
            label="Website URL"
            name="websites.0.webUrl"
            placeholder="https://youtube.com/channel"
            type="url"
          />
          <button className="btn" type="button" onClick={addWebsite}>
            Add
          </button>
        </fieldset>
      </Modal>
    </>
  );
}
