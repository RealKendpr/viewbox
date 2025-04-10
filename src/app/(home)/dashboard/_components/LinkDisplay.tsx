import { LinkType } from "@/types/PageTypes";
import { useFormContext } from "react-hook-form";
import { Input } from "../create/_components/input";
import { useEffect, useState } from "react";
import testUrl from "../_utils/testUrl";
import dynamic from "next/dynamic";
const EditLink = dynamic(() => import("./editLink"));
const Modal = dynamic(() => import("@/_components/modal"));

export default function LinkDisplay({
  links,
  setLinks,
}: {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
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

  const newLink: LinkType = getValues("links.0");

  const addLink = () => {
    const linkUrl = testUrl(newLink.linkUrl);
    if (newLink.linkName === "") {
      setError("links.0.linkName", { type: "required" }, { shouldFocus: true });
    }
    if (!linkUrl) {
      setError("links.0.linkUrl", { type: "pattern" }, { shouldFocus: true });
      return;
    }
    setLinks((prev) => [...prev, newLink]);
    setValue("links.0", { linkName: "", linkUrl: "" });
    setOPenField(false);
  };
  const removeLink = (index: number) => {
    const newItems = links.filter((_, i) => i !== index);
    setLinks(newItems);
  };

  useEffect(() => {
    if (errors.links && newLink.linkName !== "") {
      clearErrors("links.0.linkName");
    }
  }, [newLink, clearErrors, errors]);
  useEffect(() => {
    if (errors.links && testUrl(newLink.linkUrl)) {
      clearErrors("links.0.linkUrl");
    }
  }, [newLink, clearErrors, errors]);
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
      if (newLink.linkUrl === "" && newLink.linkName === "") {
        clearErrors("links.0");
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openField, clearErrors, newLink]);

  return (
    <>
      <div className="mt-3 flex min-h-52 flex-col">
        <p className="text-xl font-bold">Links</p>
        <EditLink links={links} setLinks={setLinks} removeLink={removeLink} />
        <button
          className="btn btn-dash btn-sm mb-5 w-[calc(100%-12px)] self-center"
          type="button"
          onClick={() => setOPenField(true)}
        >
          Add a link
        </button>
      </div>
      <Modal isOpen={openField} setIsOpen={setOPenField}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Add Link</legend>
          <Input label="Name" name="links.0.linkName" placeholder="Youtube" />
          <Input
            label="URL"
            name="links.0.linkUrl"
            placeholder="https://"
            type="url"
          />
          <button className="btn" type="button" onClick={addLink}>
            Add
          </button>
        </fieldset>
      </Modal>
    </>
  );
}
