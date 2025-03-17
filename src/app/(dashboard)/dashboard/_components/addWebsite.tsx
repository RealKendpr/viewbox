import { PageType, WebsiteType } from "@/types/PageTypes";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../create/_components/input";

export default function AddWebsite({
  methods,
  website,
  setWebsite,
}: {
  methods: UseFormReturn<PageType, undefined>;
  website: WebsiteType[];
  setWebsite: React.Dispatch<React.SetStateAction<WebsiteType[]>>;
}) {
  const addWebsite = () => {
    const newWebsite = methods.watch("websites.0");

    if (newWebsite.webName && newWebsite.webUrl) {
      setWebsite((prev) => [...prev, newWebsite]);
      methods.setValue("websites.0", { webName: "", webUrl: "" });
    }
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Websites</legend>
      <Input
        label="Website Name"
        name="websites.0.webName"
        placeholder="Youtube"
        // required={true}
      />
      <Input
        label="Website URL"
        name="websites.0.webUrl"
        placeholder="https://youtube.com/channel"
        type="url"
        // required={true}
      />
      <button className="btn" type="button" onClick={addWebsite}>
        Add
      </button>
    </fieldset>
  );
}
