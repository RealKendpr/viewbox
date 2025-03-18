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
    }
  };

  return (
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
  );
}
