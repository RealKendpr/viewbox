import { WebsiteType } from "@/types/PageTypes";
import { useFormContext } from "react-hook-form";
import { Input } from "../create/_components/input";
import { useEffect, useState } from "react";
import testUrl from "../_utils/testUrl";
import dynamic from "next/dynamic";
const LinkDisplay = dynamic(() => import("./linkDisplay"));
const Modal = dynamic(() => import("@/_components/modal"));

export default function AddWebsite({
  website,
  setWebsite,
}: {
  website: WebsiteType[];
  setWebsite: React.Dispatch<React.SetStateAction<WebsiteType[]>>;
}) {
  const [openField, setOPenField] = useState<boolean>(false);
  const methods = useFormContext();
  const {
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const newWebsite: WebsiteType = getValues("websites.0");

  const addWebsite = () => {
    const webUrl = testUrl(newWebsite.webUrl);
    if (newWebsite.webName === "") {
      setError(
        "websites.0.webName",
        { type: "required" },
        { shouldFocus: true },
      );
    }
    if (!webUrl) {
      setError("websites.0.webUrl", { type: "pattern" }, { shouldFocus: true });
    }
    setWebsite((prev) => [...prev, newWebsite]);
    setValue("websites.0", { webName: "", webUrl: "" });
    setOPenField(false);
  };
  const removeWebsite = (index: number) => {
    const newItems = website.filter((_, i) => i !== index);
    setWebsite(newItems);
  };

  useEffect(() => {
    if (errors.websites && newWebsite.webName !== "") {
      clearErrors("websites.0.webName");
    }
  }, [newWebsite && newWebsite.webName]);
  useEffect(() => {
    if (errors.websites && testUrl(newWebsite.webUrl)) {
      clearErrors("websites.0.webUrl");
    }
  }, [newWebsite && newWebsite.webUrl]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // enter should be allowed when user is focused on the Add button
      if (
        event.key === "Enter" &&
        document.activeElement?.tagName !== "BUTTON"
      ) {
        event.preventDefault();
      }
    };
    if (openField) {
      window.addEventListener("keydown", handleKeyDown);
      if (newWebsite.webUrl === "" && newWebsite.webName === "") {
        clearErrors("websites.0");
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openField]);

  return (
    <div>
      <div className="flex min-h-52 flex-col">
        <p className="text-xl font-bold">Links</p>
        <LinkDisplay
          website={website}
          setWebsite={setWebsite}
          removeWebsite={removeWebsite}
        />
        <button
          className="btn btn-dash btn-sm w-[calc(100%-12px)] self-center"
          type="button"
          onClick={() => setOPenField(true)}
        >
          Add a link
        </button>
      </div>
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
    </div>
  );
}
